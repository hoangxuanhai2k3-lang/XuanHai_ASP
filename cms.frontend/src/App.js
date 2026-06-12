import React, { useEffect, useState } from "react";
import homeService from "./services/homeService";
import Cart from "./Cart";
import CustomerLogin from "./CustomerLogin";
import CustomerRegister from "./CustomerRegister";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import PolicyPage from "./pages/PolicyPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogCategoryList from "./BlogCategoryList";
import "./App.css";

const API_URL = "https://localhost:7132";

function App() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const path = window.location.pathname.toLowerCase();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const categoriesData = await homeService.getCategories();
                const productsData = await homeService.getProducts();

                setCategories(categoriesData);
                setProducts(productsData);
            } catch {
                setError("Không lấy được dữ liệu. Vui lòng kiểm tra Backend API.");
            } finally {
                setLoading(false);
            }

            setCart(JSON.parse(localStorage.getItem("cart")) || []);
            setCustomer(JSON.parse(localStorage.getItem("customer")) || null);
        };

        loadData();
    }, []);

    if (path === "/cart") return <Cart />;
    if (path === "/login") return <CustomerLogin />;
    if (path === "/register") return <CustomerRegister />;
    if (path === "/blog") return <BlogList />;
    if (path.startsWith("/blog/")) return <BlogDetail />;

    if (path === "/policy/shipping") return <PolicyPage type="shipping" />;
    if (path === "/policy/return") return <PolicyPage type="return" />;
    if (path === "/policy/privacy") return <PolicyPage type="privacy" />;

    if (path === "/about") return <About />;
    if (path === "/contact") return <Contact />;


    const handleSearch = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await homeService.searchProducts(keyword);
            setProducts(result);
            setSelectedCategory("all");

            setTimeout(() => {
                const el = document.getElementById("shop");
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch {
            setError("Không tìm kiếm được sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((p) => {
        const matchCategory =
            selectedCategory === "all" ||
            Number(p.categoryProductId) === Number(selectedCategory);

        const matchKeyword = p.name
            ?.toLowerCase()
            .includes(keyword.toLowerCase());

        return matchCategory && matchKeyword;
    });

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const addToCart = (product, showMessage = true) => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existItem = currentCart.find((item) => item.id === product.id);

        let newCart;

        if (existItem) {
            newCart = currentCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...currentCart, { ...product, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);

        if (showMessage) {
            alert("Đã thêm sản phẩm vào giỏ hàng!");
        }
    };


    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (selectedProduct) {
        return (
            <div className="page">
                <Header
                    keyword={keyword}
                    setKeyword={setKeyword}
                    cartCount={cartCount}
                    scrollToSection={scrollToSection}
                    setSelectedProduct={setSelectedProduct}
                    customer={customer}
                    handleSearch={handleSearch}
                />

                <section className="product-detail-page">
                    <button className="back-btn" onClick={() => setSelectedProduct(null)}>
                        ← Quay lại trang chủ
                    </button>

                    <div className="detail-layout">
                        <div className="detail-image">
                            <img
                                src={`${API_URL}${selectedProduct.imageUrl}`}
                                alt={selectedProduct.name}
                            />
                        </div>

                        <div className="detail-info">
                            <h1>{selectedProduct.name}</h1>

                            <p className="detail-price">
                                {Number(selectedProduct.price).toLocaleString("vi-VN")} đ
                            </p>

                            <p className="detail-stock">
                                Tồn kho: <strong>{selectedProduct.stockQuantity}</strong>
                            </p>

                            <p className="detail-desc">
                                {selectedProduct.description ||
                                    "Sản phẩm thời trang cao cấp, phù hợp đi làm, đi chơi và dự tiệc."}
                            </p>

                            <div className="detail-actions">
                                <button onClick={() => addToCart(selectedProduct)}>
                                    🛒 Thêm vào giỏ
                                </button>

                                <button
                                    className="buy-now"
                                    onClick={() => {
                                        addToCart(selectedProduct);
                                        window.location.href = "/cart";
                                    }}
                                >
                                    Mua ngay
                                </button>
                            </div>

                            <div className="policy-box">
                                <p>🚚 Giao hàng toàn quốc</p>
                                <p>🔁 Đổi trả trong 7 ngày</p>
                                <p>💬 Hỗ trợ khách hàng 24/7</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    return (
        <div className="page">
            <Header
                keyword={keyword}
                setKeyword={setKeyword}
                cartCount={cartCount}
                scrollToSection={scrollToSection}
                setSelectedProduct={setSelectedProduct}
                customer={customer}
                handleSearch={handleSearch}
            />

            <section id="home" className="hero-banner">
                <img
                    src={`${API_URL}/images/banner-fashion.jpg`}
                    alt="HaiCMS Fashion Banner"
                />

                <div className="hero-content">
                    <h1>HAICMS FASHION</h1>
                    <h2>Bộ sưu tập thời trang công sở & dạ hội 2026</h2>
                    <p>Ưu đãi độc quyền - Giảm giá lên đến 50%</p>
                    <button onClick={() => scrollToSection("shop")}>
                        Mua sắm ngay
                    </button>
                </div>
            </section>

            <section className="category-tabs">
                <button
                    className={selectedCategory === "all" ? "active" : ""}
                    onClick={() => setSelectedCategory("all")}
                >
                    Tất cả sản phẩm
                </button>

                {categories.map((item) => (
                    <button
                        key={item.id}
                        className={Number(selectedCategory) === Number(item.id) ? "active" : ""}
                        onClick={() => setSelectedCategory(item.id)}
                    >
                        {item.name}
                    </button>
                ))}
            </section>

            <section id="shop" className="section">
                <div className="section-title">
                    <h2>SẢN PHẨM NỔI BẬT</h2>
                    <span>Hiển thị {filteredProducts.length} sản phẩm</span>
                </div>

                {loading && (
                    <div className="loading-box">
                        Đang tải dữ liệu...
                    </div>
                )}

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="product-grid">
                        {filteredProducts.map((item) => (
                            <div className="product-card" key={item.id}>
                                <div className="product-img">
                                    <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />
                                </div>

                                <div className="product-info">
                                    <h3>{item.name}</h3>

                                    <p className="product-category">
                                        {item.categoryProductName || item.categoryName || "Thời trang"}
                                    </p>

                                    <p className="price">
                                        {Number(item.price).toLocaleString("vi-VN")} đ
                                    </p>

                                    <div className="product-actions">
                                        <button
                                            className="btn-detail"
                                            onClick={() => setSelectedProduct(item)}
                                        >
                                            Chi tiết
                                        </button>

                                        <button
                                            className="btn-buy"
                                            onClick={() => {
                                                addToCart(item, false);
                                                window.location.href = "/cart";
                                            }}
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="empty-box">
                        Không tìm thấy sản phẩm phù hợp.
                    </div>
                )}
                {!loading && !error && (
                    <div className="product-grid">
                        {filteredProducts.map((item) => (
                            <div className="product-card" key={item.id}>
                                <div className="product-img">
                                    <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />
                                </div>

                                <div className="product-info">
                                    <h3>{item.name}</h3>

                                    <p className="product-category">
                                        {item.categoryProductName || item.categoryName || "Thời trang"}
                                    </p>

                                    <p className="price">
                                        {Number(item.price).toLocaleString("vi-VN")} đ
                                    </p>

                                    <div className="product-actions">
                                        <button
                                            className="btn-detail"
                                            onClick={() => setSelectedProduct(item)}
                                        >
                                            Chi tiết
                                        </button>

                                        <button
                                            className="btn-buy"
                                            onClick={() => {
                                                addToCart(item, false);
                                                window.location.href = "/cart";
                                            }}
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="empty-box">
                        Không tìm thấy sản phẩm phù hợp.
                    </div>
                )}


                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="empty-box">
                        Không tìm thấy sản phẩm phù hợp.
                    </div>
                )}
            </section>
            <BlogCategoryList />

            <Footer />
        </div>
    );
}

function Header({ keyword, setKeyword, cartCount, scrollToSection, setSelectedProduct, customer, handleSearch }) {
    const logout = () => {
        localStorage.removeItem("customer");
        window.location.href = "/";
    };

    return (
        <>
            <div className="topbar">
                <span>📞 Hotline: 0865380705</span>
                <span>✉ support@haicms.vn</span>

                {customer ? (
                    <span>
                        Xin chào, {customer.fullName || customer.email} |{" "}
                        <button className="top-link" onClick={logout}>Đăng xuất</button>
                    </span>
                ) : (
                    <span>
                        <button className="top-link" onClick={() => window.location.href = "/login"}>
                            Đăng nhập
                        </button>
                        {" | "}
                        <button className="top-link" onClick={() => window.location.href = "/register"}>
                            Đăng ký
                        </button>
                    </span>
                )}
            </div>

            <header className="header">
                <div
                    className="logo"
                    onClick={() => {
                        setSelectedProduct(null);
                        window.location.href = "/";
                    }}
                >
                    HaiCMS<span>.Fashion</span>
                </div>

                <input
                    className="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <div className="cart" onClick={() => window.location.href = "/cart"}>
                    🛒 <span>{cartCount}</span>
                </div>
            </header>

            <nav className="menu">
                <button onClick={() => window.location.href = "/"}>Trang Chủ</button>
                <button onClick={() => window.location.href = "/#shop"}>Cửa Hàng</button>
                <button onClick={() => window.location.href = "/blog"}>Tin Tức / Blog</button>
                <button onClick={() => window.location.href = "/about"}>Về Chúng Tôi</button>
                <button onClick={() => window.location.href = "/contact"}>Liên hệ</button>
            </nav>
        </>
    );
}

function Footer() {
    return (
        <>
            <footer id="about" className="footer">
                <div>
                    <h3>
                        HaiCMS<span>.Fashion</span>
                    </h3>
                    <p>
                        Hệ thống thời trang cao cấp dành cho công sở, dạ hội và phong cách
                        thanh lịch hằng ngày.
                    </p>
                </div>

                <div>
                    <h4>CHÍNH SÁCH</h4>
                    <p><a href="/policy/shipping">Chính sách giao hàng</a></p>
                    <p><a href="/policy/return">Chính sách đổi trả</a></p>
                    <p><a href="/policy/privacy">Bảo mật thông tin</a></p>
                </div>

                <div>
                    <h4>LIÊN HỆ</h4>
                    <p>📍 TP. Hồ Chí Minh</p>
                    <p>📞 0865380705</p>
                    <p>✉ support@haicms.vn</p>
                </div>
            </footer>

            <div className="copyright">
                © 2026 HaiCMS Retail. All Rights Reserved.
            </div>
        </>
    );
}

export default App;