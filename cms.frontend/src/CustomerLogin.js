import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://localhost:7132";

function CustomerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/Auth/CustomerLogin`, {
                email,
                password,
            });

            localStorage.setItem("customer", JSON.stringify(res.data));
            alert("Đăng nhập thành công!");
            window.location.href = "/";
        } catch {
            alert("Email hoặc mật khẩu không đúng!");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-box" onSubmit={handleLogin}>
                <h2>ĐĂNG NHẬP KHÁCH HÀNG</h2>

                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Mật khẩu</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Đăng nhập</button>

                <p>
                    Chưa có tài khoản? <a href="/register">Đăng ký</a>
                </p>
            </form>
        </div>
    );
}

export default CustomerLogin;