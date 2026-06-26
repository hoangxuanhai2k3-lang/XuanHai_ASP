import React from "react";

const API_URL = "https://localhost:7132";

function ProductQuickView({ selectedProduct, setSelectedProduct, addToCart }) {
    return (
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
    );
}

export default ProductQuickView;