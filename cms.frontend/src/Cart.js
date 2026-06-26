import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const API_URL = "https://localhost:7132";

function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    const updateQuantity = (id, change) => {
        const newCart = cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const total = cart.filter(i => selectedIds.includes(i.id)).reduce((sum, i) => sum + (Number(i.price) * i.quantity), 0);

    const navigateToCheckout = () => {
        if (selectedIds.length === 0) return alert("Vui lòng chọn sản phẩm!");
        localStorage.setItem("checkoutItems", JSON.stringify(cart.filter(i => selectedIds.includes(i.id))));
        window.location.href = "/checkout";
    };

    return (
        <div className="page">
            <Header /> {/* Dùng Header trang chủ */}
            <div className="cart-wrapper">
                <h2>GIỎ HÀNG CỦA BẠN</h2>
                {cart.length === 0 ? (
                    <div className="empty-cart-message">Giỏ hàng trống. <a href="/shop">Tiếp tục mua hàng</a></div>
                ) : (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Chọn</th><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td><input type="checkbox" onChange={() => toggleSelect(item.id)} /></td>
                                    <td className="product-info">
                                        <img src={`${API_URL}${item.imageUrl}`} alt={item.name} />
                                        <h4>{item.name}</h4>
                                        <button className="remove-btn" onClick={() => removeItem(item.id)}>Xóa</button>
                                    </td>
                                    <td>{Number(item.price).toLocaleString()} đ</td>
                                    <td>
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </td>
                                    <td>{(Number(item.price) * item.quantity).toLocaleString()} đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="cart-footer">
                    <h3>Tổng tiền: {total.toLocaleString()} đ</h3>
                    <button className="checkout-btn" onClick={navigateToCheckout}>Thanh toán</button>
                </div>
            </div>
            <Footer /> {/* Dùng Footer trang chủ */}
        </div>
    );
}
export default Cart;