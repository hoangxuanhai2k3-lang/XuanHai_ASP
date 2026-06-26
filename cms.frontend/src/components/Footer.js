import React from "react";

function Footer() {
    return (
        <>
            <footer id="about" className="footer">
                <div>
                    <h3>
                        HaiCMS<span>.Fashion</span>
                    </h3>
                    <p>
                        Hệ thống thời trang cao cấp dành cho công sở, dạ hội và phong cách
                        thanh lịch hằng ngày.
                    </p>
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

            <div className="copyright">
                © 2026 HaiCMS Retail. All Rights Reserved.
            </div>
        </>
    );
}

export default Footer;