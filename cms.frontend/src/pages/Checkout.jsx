import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../App.css";

const API_URL = "https://localhost:7132";

function Checkout() {
    const [orderItems, setOrderItems] = useState([]);
    const [formData, setFormData] = useState({ fullName: "", email: "", address: "", phone: "" });
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
        setOrderItems(items);
    }, []);

    const total = orderItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handleConfirmOrder = async () => {
        const customer = JSON.parse(localStorage.getItem("customer"));

        // SỬA ĐIỀU KIỆN IF Ở ĐÂY ĐỂ KIỂM TRA ĐẦY ĐỦ
        if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
            alert("Vui lòng nhập đầy đủ thông tin: Họ tên, Email, Số điện thoại và Địa chỉ!");
            return;
        }

        try {
            await axios.post(`${API_URL}/api/Orders`, {
                customerId: customer?.id || 0,
                notes: `Địa chỉ: ${formData.address}. SĐT: ${formData.phone}. Email: ${formData.email}`,
                items: orderItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });

            localStorage.removeItem("checkoutItems");
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const remainingCart = cart.filter(c => !orderItems.find(o => o.id === c.id));
            localStorage.setItem("cart", JSON.stringify(remainingCart));

            setIsOrderSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Thanh toán thất bại, vui lòng kiểm tra lại API.");
        }
    };

    return (
        <div className="checkout-page-bg">
            {isOrderSuccess ? (
                // Màn hình thông báo thành công
                <div className="checkout-container">
                    <div className="checkout-card" style={{ textAlign: 'center', width: '100%', padding: '50px' }}>
                        <h2>Đặt hàng thành công!</h2>
                        <p>Cảm ơn bạn đã mua sắm tại HaiCMS.Fashion.</p>
                        <button
                            className="confirm-btn"
                            onClick={() => window.location.href = "/shop"}
                            style={{ marginTop: '20px', width: '250px' }}
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            ) : (
                // Màn hình form thanh toán
                <div className="checkout-container">
                    <div className="checkout-card checkout-form">
                        <h2>THANH TOÁN</h2>
                            <input required placeholder="Họ tên" onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                            <input required type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <input required placeholder="Số điện thoại" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            <input required placeholder="Địa chỉ nhận hàng" onChange={e => setFormData({ ...formData, address: e.target.value })} />
                        
                        <select>
                            <option>Thanh toán khi nhận hàng</option>
                            
                        </select>
                        <textarea placeholder="Ghi chú thêm cho đơn hàng..." rows="3"></textarea>
                        <button onClick={handleConfirmOrder} className="confirm-btn">Xác nhận thanh toán</button>
                    </div>

                    <div className="checkout-card order-summary">
                        <h4>ĐƠN HÀNG</h4>
                        {orderItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
                                <img src={API_URL + item.imageUrl} alt={item.name} style={{ width: 50 }} />
                                <div style={{ marginLeft: 10 }}>
                                    <p>{item.name}</p>
                                    <small>Số lượng: {item.quantity} - {Number(item.price).toLocaleString()} đ</small>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Tổng tiền</strong>
                            <strong style={{ color: '#d35400' }}>{total.toLocaleString()} đ</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;