import React from "react";

function Header({ keyword, setKeyword, cartCount, scrollToSection, setSelectedProduct, customer, handleSearch }) {
    const logout = () => {
        localStorage.removeItem("customer");
        window.location.href = "/";
    };

    return (
        <>
            <div className="topbar">
                <div className="topbar-left">
                    <span>📞 Hotline: 0865380705</span>
                    <span>✉ Email: support@haicms.vn</span>
                </div>

                <div className="topbar-right">
                    {customer ? (
                        <button className="top-link" onClick={logout}>Đăng xuất</button>
                    ) : (
                        <>
                            <button className="top-link" onClick={() => window.location.href = "/login"}>Đăng nhập</button>
                            <span> | </span>
                            <button className="top-link" onClick={() => window.location.href = "/register"}>Đăng ký</button>
                        </>
                    )}
                </div>
            </div>
            <header className="header">
                <div
                    className="logo"
                    onClick={() => {
                        setSelectedProduct(null);
                        window.location.href = "/";
                    }}
                >
                    HaiCMS<span>.Fashion</span>
                </div>

                <input
                    className="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <div className="cart" onClick={() => window.location.href = "/cart"}>
                    🛒 <span>{cartCount}</span>
                </div>
            </header>

            <nav className="menu">
                <button onClick={() => window.location.href = "/"}>Trang Chủ</button>
                <button onClick={() => window.location.href = "/shop"}>Cửa Hàng</button>
                <button onClick={() => window.location.href = "/blog"}>Tin Tức / Blog</button>
                <button onClick={() => window.location.href = "/about"}>Về Chúng Tôi</button>
                <button onClick={() => window.location.href = "/contact"}>Liên hệ</button>
            </nav>
        </>
    );
}

export default Header;