import React from "react";
import { PageHeader, PageFooter } from "./BlogList";
import "../App.css";

const data = {
    shipping: {
        title: "CHÍNH SÁCH GIAO HÀNG",
        content: [
            "HaiCMS Fashion hỗ trợ giao hàng toàn quốc thông qua các đơn vị vận chuyển uy tín.",
            "Thời gian giao hàng tại TP. Hồ Chí Minh từ 1 - 2 ngày làm việc. Các tỉnh thành khác từ 3 - 5 ngày làm việc.",
            "Khách hàng được kiểm tra tình trạng gói hàng trước khi nhận. Nếu sản phẩm bị lỗi do vận chuyển, HaiCMS sẽ hỗ trợ đổi mới.",
            "Phí vận chuyển sẽ được hiển thị rõ trong quá trình đặt hàng. Một số chương trình khuyến mãi có thể áp dụng miễn phí giao hàng.",
        ],
    },
    return: {
        title: "CHÍNH SÁCH ĐỔI TRẢ",
        content: [
            "Sản phẩm được hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.",
            "Điều kiện đổi trả: sản phẩm còn nguyên tem, chưa qua sử dụng, chưa giặt và không bị hư hỏng do người dùng.",
            "Khách hàng cần cung cấp hóa đơn hoặc thông tin đặt hàng để được hỗ trợ nhanh nhất.",
            "Các sản phẩm giảm giá sâu hoặc thuộc chương trình thanh lý có thể không áp dụng đổi trả, tùy chính sách từng thời điểm.",
        ],
    },
    privacy: {
        title: "CHÍNH SÁCH BẢO MẬT THÔNG TIN",
        content: [
            "HaiCMS Fashion cam kết bảo mật thông tin cá nhân của khách hàng.",
            "Thông tin như họ tên, số điện thoại, email và địa chỉ chỉ được sử dụng cho mục đích xử lý đơn hàng và chăm sóc khách hàng.",
            "Chúng tôi không bán, trao đổi hoặc chia sẻ thông tin khách hàng cho bên thứ ba nếu không có sự đồng ý.",
            "Khách hàng có quyền yêu cầu cập nhật hoặc xóa thông tin cá nhân khi cần thiết.",
        ],
    },
};

function PolicyPage({ type }) {
    const policy = data[type];

    return (
        <>
            <PageHeader />

            <div className="page-container policy-page">
                <div className="breadcrumb">Trang chủ / Chính sách / {policy.title}</div>

                <h1>{policy.title}</h1>

                {policy.content.map((p, index) => (
                    <section key={index}>
                        <h2>{index + 1}. {getTitle(type, index)}</h2>
                        <p>{p}</p>
                    </section>
                ))}
            </div>

            <PageFooter />
        </>
    );
}

function getTitle(type, index) {
    const titles = {
        shipping: ["Phạm vi giao hàng", "Thời gian giao hàng", "Kiểm tra hàng hóa", "Phí vận chuyển"],
        return: ["Thời hạn đổi trả", "Điều kiện đổi trả", "Quy trình hỗ trợ", "Trường hợp không áp dụng"],
        privacy: ["Cam kết bảo mật", "Mục đích sử dụng", "Không chia sẻ dữ liệu", "Quyền của khách hàng"],
    };

    return titles[type][index];
}

export default PolicyPage;