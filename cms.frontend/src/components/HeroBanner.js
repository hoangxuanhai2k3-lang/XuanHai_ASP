import React from "react";

const API_URL = "https://localhost:7132";

function HeroBanner() {
    return (
        <section id="home" className="hero-banner">
            <img
                src={`${API_URL}/images/banner-fashion.jpg`}
                alt="HaiCMS Fashion Banner"
            />
            <div className="hero-content">
                <h1>HAICMS FASHION</h1>
                <h2>Bộ sưu tập thời trang công sở & dạ hội 2026</h2>
                <p>Ưu đãi độc quyền - Giảm giá lên đến 50%</p>

                <button onClick={() => window.location.href = "/shop"}>
                    Mua sắm ngay
                </button>
            </div>
        </section>
    );
}

export default HeroBanner;