/* eslint-disable no-unused-vars */
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
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeaturedSlider from "./components/FeaturedSlider";
import ProductQuickView from "./components/ProductQuickView";
import FeaturedProducts from "./components/FeaturedProducts";
import HomeAllProducts from "./components/HomeAllProducts";
import Checkout from "./pages/Checkout";

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
    const [allProductsPage, setAllProductsPage] = useState(1);
    const [featuredPage, setFeaturedPage] = useState(1);

    const allProductsPerPage = 8;
    const featuredProductsPerPage = 4;

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const categoriesData = await homeService.getCategories();
                const productsData = await homeService.getProducts();
                setCategories(categoriesData);
                setProducts(productsData);
            } catch {
                setError("Không lấy được dữ liệu.");
            } finally {
                setLoading(false);
            }
            setCart(JSON.parse(localStorage.getItem("cart")) || []);
            setCustomer(JSON.parse(localStorage.getItem("customer")) || null);
        };
        loadData();
    }, []);

    const path = window.location.pathname.toLowerCase();
    const isShopPage = path === "/shop";

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError("");

            // 1. Gọi API tìm kiếm
            const result = await homeService.searchProducts(keyword);

            // 2. Cập nhật state products ngay lập tức
            setProducts(result);

            // 3. Nếu đang ở trang chủ, chuyển hướng về trang Shop để xem kết quả
            if (window.location.pathname !== "/shop") {
                window.location.href = "/shop";
            } else {
                // Nếu đang ở trang Shop, cuộn tới danh sách sản phẩm
                const el = document.getElementById("shop-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }
        } catch (err) {
            setError("Không tìm kiếm được sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const addToCart = (product, showMessage = true) => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existItem = currentCart.find((item) => item.id === product.id);
        let newCart = existItem
            ? currentCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            : [...currentCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
        if (showMessage) alert("Đã thêm vào giỏ hàng!");
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const featuredProducts = products.filter((p) => p.isFeatured === true);
    const homeAllProducts = products.slice((allProductsPage - 1) * allProductsPerPage, allProductsPage * allProductsPerPage);

    // Render logic
    const renderPageContent = () => {
        if (selectedProduct) return <ProductQuickView selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />;
        if (path === "/checkout") return <Checkout />;
        if (path === "/cart") return <Cart />;
        if (path === "/login") return <CustomerLogin />;
        if (path === "/register") return <CustomerRegister />;
        // Trong App.js, hàm renderPageContent:
        if (path === "/shop") return <Shop products={products} />;
        if (path === "/blog") return <BlogList />;
        if (path.startsWith("/blog/")) return <BlogDetail />;
        if (path === "/about") return <About />;
        if (path === "/contact") return <Contact />;

        // Trang chủ
        return (
            <>
                <FeaturedSlider products={featuredProducts} setSelectedProduct={setSelectedProduct} />
                <FeaturedProducts featuredProducts={featuredProducts} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />
                <HomeAllProducts products={products} homeAllProducts={homeAllProducts} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />
                <BlogCategoryList />
            </>
        );
    };

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

            <main>{renderPageContent()}</main>

            <Footer />
        </div>
    );
}

export default App;