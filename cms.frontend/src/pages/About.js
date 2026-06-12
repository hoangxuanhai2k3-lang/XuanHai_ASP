import React from "react";
import { PageHeader, PageFooter } from "./BlogList";
import "../App.css";

function About() {
    return (
        <>
            <PageHeader />

            <div className="page-container policy-page">
                <div className="breadcrumb">Trang chủ / Về chúng tôi</div>

                <h1>VỀ HAICMS FASHION</h1>

                <p>
                    HaiCMS Fashion là website thời trang hướng đến phong cách thanh lịch,
                    hiện đại và phù hợp với môi trường công sở, dạ hội và đời sống hằng ngày.
                </p>

                <h2>Sứ mệnh</h2>
                <p>
                    Mang đến cho khách hàng những sản phẩm thời trang chất lượng, dễ phối đồ
                    và phù hợp với nhiều hoàn cảnh sử dụng.
                </p>

                <h2>Giá trị cốt lõi</h2>
                <p>
                    Chúng tôi chú trọng vào chất lượng sản phẩm, trải nghiệm mua sắm,
                    dịch vụ chăm sóc khách hàng và sự minh bạch trong từng đơn hàng.
                </p>

                <h2>Định hướng phát triển</h2>
                <p>
                    HaiCMS Fashion tiếp tục hoàn thiện hệ thống bán hàng trực tuyến,
                    tích hợp giỏ hàng, thanh toán, quản lý đơn hàng và chăm sóc khách hàng.
                </p>
            </div>

            <PageFooter />
        </>
    );
}

export default About;