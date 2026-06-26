import React from "react";

const API_URL = "https://localhost:7132";

function HomeAllProducts({
    products,
    homeAllProducts,
    allProductsPage,
    setAllProductsPage,
    allProductsTotalPages,
    setSelectedProduct,
    addToCart
}) {
    return (
        <section className="home-all-products-section">
            <div className="home-all-products-container">
                <div className="section-title-row">
                    <h2>TẤT CẢ SẢN PHẨM</h2>
                </div>

                <div className="home-all-product-grid">
                    {homeAllProducts.map((item) => (
                        <div className="product-card" key={item.id}>
                            <div className="product-img">
                                <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />
                            </div>
                            <div className="product-info">
                                <h3>{item.name}</h3>
                                <p className="product-category">{item.categoryName || "Thời trang"}</p>
                                <p className="price">{Number(item.price).toLocaleString("vi-VN")} đ</p>

                                <div className="product-actions">
                                    <button className="btn-detail" onClick={() => setSelectedProduct(item)}>
                                        Chi tiết
                                    </button>
                                    <button className="btn-buy" onClick={() => { addToCart(item, false); window.location.href = "/cart"; }}>
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                {allProductsTotalPages > 1 && (
                    <div className="pagination">
                        <button disabled={allProductsPage === 1} onClick={() => setAllProductsPage((page) => page - 1)}>Trước</button>
                        {Array.from({ length: allProductsTotalPages }, (_, i) => i + 1).map((page) => (
                            <button key={page} className={allProductsPage === page ? "active" : ""} onClick={() => setAllProductsPage(page)}>
                                {page}
                            </button>
                        ))}
                        <button disabled={allProductsPage === allProductsTotalPages} onClick={() => setAllProductsPage((page) => page + 1)}>Sau</button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default HomeAllProducts;