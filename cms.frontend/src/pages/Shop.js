import React, { useEffect, useState } from "react";
import "../App.css";
import homeService from "../services/homeService";

const API_URL = "https://localhost:7132";

function Shop({ products: propsProducts }) {
    // Nhận danh sách sản phẩm từ App.js truyền qua prop 'products'
    const [products, setProducts] = useState(propsProducts || []);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await homeService.getCategories();
            setCategories(Array.isArray(data) ? data : data?.data || []);
        };
        fetchCategories();
    }, []); // Chạy 1 lần khi trang Shop load
    // Cập nhật lại danh sách khi App.js thay đổi kết quả tìm kiếm
    useEffect(() => {
        setProducts(propsProducts || []);
    }, [propsProducts]);

    // Lọc sản phẩm theo danh mục
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((item) => Number(item.categoryProductId) === Number(selectedCategory));

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const pagedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const chooseCategory = (id) => {
        setSelectedCategory(id);
        setCurrentPage(1);
    };

    const addToCart = (item) => {
        const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = oldCart.find((x) => Number(x.id) === Number(item.id));
        let newCart = existing
            ? oldCart.map((x) => Number(x.id) === Number(item.id) ? { ...x, quantity: Number(x.quantity || 1) + 1 } : x)
            : [...oldCart, { ...item, quantity: 1 }];

        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.href = "/cart";
    };

    return (
        <main className="shop-page">
            <section className="shop-category-section">
                <div className="shop-category-tabs">
                    <button className={selectedCategory === "all" ? "active" : ""} onClick={() => chooseCategory("all")}>
                        TẤT CẢ SẢN PHẨM
                    </button>
                    {categories.map((item) => (
                        <button key={item.id} className={Number(selectedCategory) === Number(item.id) ? "active" : ""} onClick={() => chooseCategory(item.id)}>
                            {item.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="shop-products-section">
                <div className="shop-products-container">
                    <div className="shop-title-row">
                        <h2>{selectedCategory === "all" ? "TẤT CẢ SẢN PHẨM" : "SẢN PHẨM THEO DANH MỤC"}</h2>
                        <span>Hiển thị {pagedProducts.length} trên {filteredProducts.length} sản phẩm</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="empty-products">Không có sản phẩm phù hợp.</div>
                    ) : (
                        <>
                            <div className="shop-product-grid">
                                {pagedProducts.map((item) => (
                                    <article className="shop-product-card" key={item.id}>
                                        <div className="shop-product-image">
                                            <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />
                                        </div>
                                        <div className="shop-product-info">
                                            <h3>{item.name}</h3>
                                            <p className="product-category">{item.categoryProductName || "Thời trang"}</p>
                                            <p className="price">{Number(item.price).toLocaleString("vi-VN")} đ</p>
                                            <div className="shop-product-actions">
                                                <a href={`/product/${item.id}`} className="btn-detail">Chi tiết</a>
                                                <button type="button" className="btn-buy" onClick={() => addToCart(item)}>Mua ngay</button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="shop-pagination">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Trước</button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button key={page} className={currentPage === page ? "active" : ""} onClick={() => setCurrentPage(page)}>
                                            {page}
                                        </button>
                                    ))}
                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Sau</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Shop;