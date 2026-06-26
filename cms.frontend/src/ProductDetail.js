import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://localhost:7132";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/Products/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => alert("Không tìm thấy sản phẩm"));
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist = cart.find((x) => x.id === product.id);

        if (exist) {
            exist.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };

    if (!product) return <p>Đang tải...</p>;

    return (
        <div className="product-detail-page">
            <div className="detail-layout">
                <div className="detail-image">
                    <img src={`${API_URL}${product.imageUrl}`} alt={product.name} />
                </div>

                <div className="detail-info">
                    <h1>{product.name}</h1>

                    <p className="detail-price">
                        {product.price.toLocaleString("vi-VN")} đ
                    </p>

                    <p>Tồn kho: {product.stockQuantity}</p>

                    <p className="detail-desc">
                        {product.description || "Sản phẩm thời trang cao cấp, phù hợp đi làm, đi chơi và dự tiệc."}
                    </p>

                    <button onClick={addToCart} className="main-btn">
                        Thêm vào giỏ hàng
                    </button>

                    <a href="/cart" className="outline-btn">
                        Xem giỏ hàng
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;