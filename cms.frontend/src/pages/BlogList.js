import React, { useEffect, useState } from "react";
import homeService from "../services/homeService";
import "../App.css";

const API_URL = "https://localhost:7132";

function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        homeService.getPosts().then(setPosts);
    }, []);

    return (
        <>
            <PageHeader />

            <div className="page-container">
                <div className="breadcrumb">Trang chủ / Tin tức</div>

                <h1>TIN TỨC THỜI TRANG</h1>
                <p>Cập nhật xu hướng phối đồ, mẹo chọn trang phục và kiến thức thời trang.</p>

                <div className="blog-grid">
                    {posts.map((post) => (
                        <div className="blog-card" key={post.id}>
                            <img src={`${API_URL}${post.imageUrl}`} alt={post.title} />

                            <div className="blog-content">
                                <small>📅 {new Date(post.createdDate).toLocaleDateString("vi-VN")}</small>
                                <h3>{post.title}</h3>
                                <p>{post.content?.replace(/<[^>]+>/g, "").substring(0, 120)}...</p>
                                <a href={`/blog/${post.id}`}>Đọc bài viết →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PageFooter />
        </>
    );
}

function PageHeader() {
    return (
        <>
            <div className="topbar">
                <span>📞 Hotline: 0865380705</span>
                <span>✉ support@haicms.vn</span>
                <span><a href="/login">Đăng nhập</a> | <a href="/register">Đăng ký</a></span>
            </div>

            <header className="header">
                <div className="logo" onClick={() => window.location.href = "/"}>
                    HaiCMS<span>.Fashion</span>
                </div>
                <input className="search" placeholder="Tìm kiếm sản phẩm..." />
                <div className="cart" onClick={() => window.location.href = "/cart"}>🛒</div>
            </header>

            <nav className="menu">
                <button onClick={() => window.location.href = "/"}>Trang Chủ</button>
                <button onClick={() => window.location.href = "/#shop"}>Cửa Hàng</button>
                <button onClick={() => window.location.href = "/blog"}>Tin Tức / Blog</button>
                <button onClick={() => window.location.href = "/about"}>Về Chúng Tôi</button>
                <button onClick={() => window.location.href = "/contact"}>Liên hệ</button>
            </nav>
        </>
    );
}

function PageFooter() {
    return (
        <>
            <footer className="footer">
                <div>
                    <h3>HaiCMS<span>.Fashion</span></h3>
                    <p>Hệ thống thời trang cao cấp dành cho công sở, dạ hội và phong cách thanh lịch.</p>
                </div>

                <div>
                    <h4>CHÍNH SÁCH</h4>
                    <p><a href="/policy/shipping">Chính sách giao hàng</a></p>
                    <p><a href="/policy/return">Chính sách đổi trả</a></p>
                    <p><a href="/policy/privacy">Bảo mật thông tin</a></p>
                </div>

                <div>
                    <h4>LIÊN HỆ</h4>
                    <p>📍 TP. Hồ Chí Minh</p>
                    <p>📞 0865380705</p>
                    <p>✉ support@haicms.vn</p>
                </div>
            </footer>

            <div className="copyright">© 2026 HaiCMS Retail. All Rights Reserved.</div>
        </>
    );
}

export default BlogList;
export { PageHeader, PageFooter };