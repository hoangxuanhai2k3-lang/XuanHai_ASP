import React, { useState } from "react";
import { PageHeader, PageFooter } from "./BlogList";
import "../App.css";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const submit = (e) => {
        e.preventDefault();
        alert("Cảm ơn bạn đã liên hệ. HaiCMS Fashion sẽ phản hồi sớm!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <>
            <PageHeader />

            <div className="page-container contact-page">
                <div className="breadcrumb">Trang chủ / Liên hệ</div>

                <h1>LIÊN HỆ HAICMS FASHION</h1>

                <div className="contact-layout">
                    <div>
                        <h2>Thông tin liên hệ</h2>
                        <p>📍 TP. Hồ Chí Minh</p>
                        <p>📞 0865380705</p>
                        <p>✉ support@haicms.vn</p>
                        <p>⏰ Thời gian hỗ trợ: 8:00 - 21:00 hằng ngày</p>
                    </div>

                    <form onSubmit={submit}>
                        <input
                            placeholder="Họ tên"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        <input
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />

                        <textarea
                            placeholder="Nội dung liên hệ"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                        />

                        <button>Gửi liên hệ</button>
                    </form>
                </div>
            </div>

            <PageFooter />
        </>
    );
}

export default Contact;