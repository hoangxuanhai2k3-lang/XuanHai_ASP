import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://localhost:7132";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(data);
    }, []);

    const updateQuantity = (id, change) => {
        const newCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        );

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const removeItem = (id) => {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    const checkout = async () => {
        const customer = JSON.parse(localStorage.getItem("customer"));

        if (!customer) {
            alert("Bạn cần đăng nhập trước khi thanh toán!");
            window.location.href = "/login";
            return;
        }

        try {
            await axios.post(`${API_URL}/api/Orders`, {
                customerId: customer.id || customer.customerId,
                notes: "Khách đặt hàng từ website",
                items: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });

            localStorage.removeItem("cart");
            alert("Đặt hàng thành công!");
            window.location.href = "/";
        } catch {
            alert("Thanh toán thất bại. Kiểm tra API /api/Orders.");
        }
    };

    return (
        <>
            <div className="topbar">
                <span>📞 Hotline: 0865380705</span>
                <span>✉ support@haicms.vn</span>
                <span onClick={() => window.location.href = "/login"}>Đăng nhập | Đăng ký</span>
            </div>

            <header className="header">
                <div className="logo" onClick={() => window.location.href = "/"}>
                    HaiCMS<span>.Fashion</span>
                </div>

                <input className="search" placeholder="Tìm kiếm sản phẩm..." />

                <div className="cart" onClick={() => window.location.href = "/cart"}>
                    🛒 <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
            </header>

            <nav className="menu">
                <button onClick={() => window.location.href = "/"}>Trang Chủ</button>
                <button onClick={() => window.location.href = "/"}>Cửa Hàng</button>
                <button onClick={() => window.location.href = "/"}>Tin Tức / Blog</button>
                <button onClick={() => window.location.href = "/"}>Về Chúng Tôi</button>
            </nav>

            <div className="cart-wrapper">
                <div className="cart-breadcrumb">Trang chủ / Giỏ hàng</div>

                <div className="cart-main">
                    <h2>GIỎ HÀNG CỦA BẠN</h2>

                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Giỏ hàng đang trống.</p>
                            <a href="/">← Tiếp tục mua hàng</a>
                        </div>
                    ) : (
                        <>
                            <div className="cart-list">
                                <div className="cart-row cart-head">
                                    <div>Thông tin sản phẩm</div>
                                    <div>Đơn giá</div>
                                    <div>Số lượng</div>
                                    <div>Thành tiền</div>
                                </div>

                                {cart.map((item) => (
                                    <div className="cart-row" key={item.id}>
                                        <div className="cart-product">
                                            <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />

                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>{item.categoryProductName || item.categoryName || "Thời trang"}</p>
                                                <button className="remove-link" onClick={() => removeItem(item.id)}>
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-price">
                                            {Number(item.price).toLocaleString("vi-VN")} đ
                                        </div>

                                        <div className="quantity-box">
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>

                                        <div className="cart-money">
                                            {(Number(item.price) * item.quantity).toLocaleString("vi-VN")} đ
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <span>Tổng tiền:</span>
                                <strong>{total.toLocaleString("vi-VN")} đ</strong>
                            </div>

                            <button className="cart-checkout" onClick={checkout}>
                                Thanh toán
                            </button>

                            <a href="/" className="continue-buy">← Tiếp tục mua hàng</a>
                        </>
                    )}
                </div>
            </div>

            <footer id="about" className="footer">
                <div>
                    <h3>HaiCMS<span>.Fashion</span></h3>
                    <p>Hệ thống thời trang cao cấp dành cho công sở, dạ hội và phong cách thanh lịch hằng ngày.</p>
                </div>

                <div>
                    <h4>CHÍNH SÁCH</h4>
                    <p>Chính sách giao hàng</p>
                    <p>Chính sách đổi trả</p>
                    <p>Bảo mật thông tin</p>
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

export default Cart;