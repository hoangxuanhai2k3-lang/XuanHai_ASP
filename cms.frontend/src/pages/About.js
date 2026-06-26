import React from "react";
import "../App.css";

const API_URL = "https://localhost:7132";

function About() {
    return (
        <>
      

            <main className="about-page">
                <section className="about-hero">
                    <img
                        src={`${API_URL}/images/banner-fashion.jpg`}
                        alt="HaiCMS Fashion"
                    />

                    <div className="about-hero-overlay">
                        <span>HAICMS FASHION</span>
                        <h1>Thời trang thanh lịch cho phụ nữ hiện đại</h1>
                        <p>
                            Đồng hành cùng khách hàng trong công việc, sự kiện
                            và những khoảnh khắc thường ngày.
                        </p>

                        <div className="about-hero-actions">
                            <button
                                onClick={() => {
                                    window.location.href = "/shop";
                                }}
                            >
                                Khám phá sản phẩm
                            </button>

                            <button
                                className="about-outline-btn"
                                onClick={() => {
                                    window.location.href = "/contact";
                                }}
                            >
                                Liên hệ với chúng tôi
                            </button>
                        </div>
                    </div>
                </section>

                <div className="about-container">
                    <div className="breadcrumb">
                        <a href="/">Trang chủ</a>
                        <span>/</span>
                        <strong>Về chúng tôi</strong>
                    </div>

                    <section className="about-story">
                        <div className="about-story-content">
                            <span className="about-label">
                                CÂU CHUYỆN THƯƠNG HIỆU
                            </span>

                            <h2>Về HaiCMS Fashion</h2>

                            <p>
                                HaiCMS Fashion được xây dựng với mong muốn mang
                                đến những sản phẩm thời trang nữ thanh lịch,
                                hiện đại và dễ ứng dụng trong cuộc sống.
                            </p>

                            <p>
                                Chúng tôi tập trung vào các dòng sản phẩm công
                                sở, dạ hội, áo thiết kế, váy đầm và phụ kiện,
                                phù hợp với nhiều phong cách và nhu cầu khác
                                nhau của khách hàng.
                            </p>

                            <p>
                                Bên cạnh việc cung cấp sản phẩm, HaiCMS Fashion
                                còn chú trọng trải nghiệm mua sắm, sự minh bạch
                                về giá, chính sách đổi trả và hỗ trợ khách hàng
                                nhanh chóng.
                            </p>
                        </div>

                        <div className="about-story-image">
                            <img
                                src={`${API_URL}/images/banner-fashion.jpg`}
                                alt="Câu chuyện HaiCMS Fashion"
                            />
                        </div>
                    </section>

                    <section className="about-values-section">
                        <div className="about-section-heading">
                            <span>ĐỊNH HƯỚNG PHÁT TRIỂN</span>
                            <h2>Những giá trị HaiCMS Fashion theo đuổi</h2>
                            <p>
                                Mỗi sản phẩm và dịch vụ đều được xây dựng dựa
                                trên sự chỉn chu, minh bạch và tôn trọng khách hàng.
                            </p>
                        </div>

                        <div className="about-values-grid">
                            <article className="about-value-card">
                                <div className="about-value-icon">🎯</div>
                                <h3>Sứ mệnh</h3>
                                <p>
                                    Mang đến sản phẩm thời trang đẹp, dễ phối,
                                    phù hợp nhiều hoàn cảnh và giúp khách hàng
                                    tự tin hơn mỗi ngày.
                                </p>
                            </article>

                            <article className="about-value-card">
                                <div className="about-value-icon">👁️</div>
                                <h3>Tầm nhìn</h3>
                                <p>
                                    Trở thành hệ thống thời trang trực tuyến uy tín,
                                    hiện đại và có trải nghiệm mua sắm thuận tiện.
                                </p>
                            </article>

                            <article className="about-value-card">
                                <div className="about-value-icon">💎</div>
                                <h3>Chất lượng</h3>
                                <p>
                                    Chú trọng chất liệu, kiểu dáng, hình ảnh và
                                    thông tin sản phẩm rõ ràng, trung thực.
                                </p>
                            </article>

                            <article className="about-value-card">
                                <div className="about-value-icon">🤝</div>
                                <h3>Tận tâm</h3>
                                <p>
                                    Luôn lắng nghe, hỗ trợ và giải quyết nhu cầu
                                    của khách hàng một cách nhanh chóng.
                                </p>
                            </article>
                        </div>
                    </section>

                    <section className="about-features">
                        <div className="about-feature-item">
                            <span>🚚</span>
                            <div>
                                <h3>Giao hàng toàn quốc</h3>
                                <p>
                                    Hỗ trợ giao hàng nhanh, kiểm tra và theo dõi
                                    đơn hàng thuận tiện.
                                </p>
                            </div>
                        </div>

                        <div className="about-feature-item">
                            <span>🔄</span>
                            <div>
                                <h3>Đổi trả rõ ràng</h3>
                                <p>
                                    Chính sách đổi trả minh bạch, giúp khách hàng
                                    yên tâm khi mua sắm.
                                </p>
                            </div>
                        </div>

                        <div className="about-feature-item">
                            <span>🔒</span>
                            <div>
                                <h3>Bảo mật thông tin</h3>
                                <p>
                                    Thông tin cá nhân và đơn hàng được quản lý
                                    an toàn trong hệ thống.
                                </p>
                            </div>
                        </div>

                        <div className="about-feature-item">
                            <span>💬</span>
                            <div>
                                <h3>Hỗ trợ tận tâm</h3>
                                <p>
                                    Đội ngũ hỗ trợ khách hàng hoạt động từ
                                    8:00 đến 21:00 hằng ngày.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="about-process-section">
                        <div className="about-section-heading">
                            <span>TRẢI NGHIỆM MUA SẮM</span>
                            <h2>Quy trình phục vụ khách hàng</h2>
                        </div>

                        <div className="about-process-grid">
                            <div className="about-process-item">
                                <strong>01</strong>
                                <h3>Khám phá sản phẩm</h3>
                                <p>
                                    Tìm kiếm và chọn sản phẩm theo danh mục,
                                    phong cách hoặc nhu cầu.
                                </p>
                            </div>

                            <div className="about-process-item">
                                <strong>02</strong>
                                <h3>Đặt hàng</h3>
                                <p>
                                    Thêm vào giỏ hàng, kiểm tra số lượng và
                                    thực hiện thanh toán.
                                </p>
                            </div>

                            <div className="about-process-item">
                                <strong>03</strong>
                                <h3>Xác nhận đơn</h3>
                                <p>
                                    Hệ thống ghi nhận đơn hàng và hỗ trợ xử lý
                                    thông tin giao nhận.
                                </p>
                            </div>

                            <div className="about-process-item">
                                <strong>04</strong>
                                <h3>Giao hàng và hỗ trợ</h3>
                                <p>
                                    Khách hàng nhận sản phẩm và được hỗ trợ
                                    trong quá trình sử dụng.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="about-statistics">
                        <div>
                            <strong>80+</strong>
                            <span>Sản phẩm thời trang</span>
                        </div>

                        <div>
                            <strong>13</strong>
                            <span>Danh mục sản phẩm</span>
                        </div>

                        <div>
                            <strong>24/7</strong>
                            <span>Tiếp nhận yêu cầu trực tuyến</span>
                        </div>

                        <div>
                            <strong>100%</strong>
                            <span>Thông tin minh bạch</span>
                        </div>
                    </section>

                    <section className="about-cta">
                        <div>
                            <span>HAICMS FASHION</span>
                            <h2>Sẵn sàng tìm phong cách phù hợp với bạn?</h2>
                            <p>
                                Khám phá các thiết kế công sở, dạ hội và thời
                                trang thanh lịch mới nhất tại cửa hàng.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                window.location.href = "/shop";
                            }}
                        >
                            Xem tất cả sản phẩm
                        </button>
                    </section>
                </div>
            </main>

         
        </>
    );
}

export default About;