import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://localhost:7132";

function CustomerRegister() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/api/Auth/CustomerRegister`, form);
            alert("Đăng ký thành công!");
            window.location.href = "/login";
        } catch {
            alert("Đăng ký thất bại!");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-box" onSubmit={handleRegister}>
                <h2>ĐĂNG KÝ TÀI KHOẢN</h2>

                <label>Họ tên</label>
                <input name="fullName" onChange={handleChange} />

                <label>Email</label>
                <input name="email" onChange={handleChange} />

                <label>Mật khẩu</label>
                <input type="password" name="password" onChange={handleChange} />

                <label>Điện thoại</label>
                <input name="phone" onChange={handleChange} />

                <label>Địa chỉ</label>
                <input name="address" onChange={handleChange} />

                <button type="submit">Đăng ký</button>

                <p>
                    Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>
            </form>
        </div>
    );
}

export default CustomerRegister;