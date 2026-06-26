import React from "react";

const API_URL = "https://localhost:7132";

function FeaturedProducts({
    loading,
    error,
    featuredProducts,
    pagedFeaturedProducts,
    featuredPage,
    setFeaturedPage,
    featuredTotalPages,
    setSelectedProduct,
    addToCart
}) {
    return (
        <section className="featured-products-section">
            <div className="featured-products-container">
                <div className="section-title-row">
                    <h2>SẢN PHẨM NỔI BẬT</h2>
                    <span>Hiển thị {featuredProducts.length} sản phẩm</span>
                </div>

                {!loading && !error && featuredProducts.length > 0 && (
                    <div className="featured-product-grid">
                        {pagedFeaturedProducts?.map((item) => (
                            <div className="featured-product-card" key={item.id}>
                                <div className="featured-product-image">
                                    <img
                                        src={`${API_URL}${item.imageUrl}`}
                                        alt={item.name}
                                    />
                                </div>

                                <div className="featured-product-info">
                                    <h3>{item.name}</h3>

                                    <p className="product-category">
                                        {item.categoryProductName ||
                                            item.categoryName ||
                                            "Thời trang"}
                                    </p>

                                    <p className="price">
                                        {Number(item.price).toLocaleString("vi-VN")} đ
                                    </p>

                                    <div className="featured-product-actions">
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
            </div>

            {featuredTotalPages > 1 && (
                <div className="featured-pagination">
                    <button
                        type="button"
                        disabled={featuredPage === 1}
                        onClick={() => setFeaturedPage((page) => page - 1)}
                    >
                        Trước
                    </button>

                    {Array.from(
                        { length: featuredTotalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            type="button"
                            key={page}
                            className={featuredPage === page ? "active" : ""}
                            onClick={() => setFeaturedPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={featuredPage === featuredTotalPages}
                        onClick={() => setFeaturedPage((page) => page + 1)}
                    >
                        Sau
                    </button>
                </div>
            )}
        </section>
    );
}

export default FeaturedProducts;