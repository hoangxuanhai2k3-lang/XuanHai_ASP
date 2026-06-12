import React, { useEffect, useState } from "react";
import homeService from "../services/homeService";
import { PageHeader, PageFooter } from "./BlogList";
import "../App.css";

const API_URL = "https://localhost:7132";

function BlogDetail() {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState({ name: "", email: "", content: "" });

    const id = Number(window.location.pathname.split("/").pop());

    useEffect(() => {
        homeService.getPosts().then(setPosts);
    }, []);

    const post = posts.find((x) => x.id === id);
    const related = posts.filter((x) => x.id !== id).slice(0, 3);

    const sendComment = (e) => {
        e.preventDefault();
        alert("Bình luận của bạn đã được ghi nhận!");
        setComment({ name: "", email: "", content: "" });
    };

    if (!post) {
        return (
            <>
                <PageHeader />
                <div className="page-container">Đang tải bài viết...</div>
                <PageFooter />
            </>
        );
    }

    return (
        <>
            <PageHeader />

            <div className="page-container blog-detail-layout">
                <main>
                    <div className="breadcrumb">
                        Trang chủ / Tin tức / {post.title}
                    </div>

                    <h1>{post.title}</h1>

                    <p className="post-date">
                        📅 {new Date(post.createdDate).toLocaleDateString("vi-VN")}
                    </p>

                    <img className="post-main-img" src={`${API_URL}${post.imageUrl}`} alt={post.title} />

                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{
                            __html:
                                post.content +
                                `
                                <h2>Gợi ý phối đồ từ HaiCMS Fashion</h2>
                                <p>Khi lựa chọn trang phục, bạn nên ưu tiên chất liệu, phom dáng và màu sắc phù hợp với hoàn cảnh sử dụng. Với môi trường công sở, các thiết kế thanh lịch, tối giản và dễ phối sẽ giúp người mặc tự tin hơn.</p>
                                <p>Đối với các buổi tiệc hoặc sự kiện, bạn có thể chọn các mẫu đầm có điểm nhấn nhẹ ở phần eo, cổ áo hoặc chất liệu vải để tạo cảm giác sang trọng nhưng vẫn tinh tế.</p>
                                <h2>Kết luận</h2>
                                <p>Thời trang không chỉ là quần áo mà còn là cách thể hiện phong cách sống. HaiCMS Fashion luôn hướng đến sự thanh lịch, hiện đại và phù hợp với nhu cầu thực tế của khách hàng.</p>
                                `,
                        }}
                    />

                    <section className="comment-box">
                        <h2>Bình luận bài viết</h2>

                        <form onSubmit={sendComment}>
                            <input
                                placeholder="Họ tên"
                                value={comment.name}
                                onChange={(e) => setComment({ ...comment, name: e.target.value })}
                                required
                            />

                            <input
                                placeholder="Email"
                                value={comment.email}
                                onChange={(e) => setComment({ ...comment, email: e.target.value })}
                                required
                            />

                            <textarea
                                placeholder="Nội dung bình luận"
                                value={comment.content}
                                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                                required
                            />

                            <button>Gửi bình luận</button>
                        </form>
                    </section>
                </main>

                <aside className="blog-sidebar">
                    <h3>Tin nổi bật</h3>

                    {related.map((item) => (
                        <a className="side-post" href={`/blog/${item.id}`} key={item.id}>
                            <img src={`${API_URL}${item.imageUrl}`} alt={item.title} />
                            <span>{item.title}</span>
                        </a>
                    ))}
                </aside>
            </div>

            <div className="page-container">
                <h2>Bài viết liên quan</h2>

                <div className="blog-grid">
                    {related.map((item) => (
                        <div className="blog-card" key={item.id}>
                            <img src={`${API_URL}${item.imageUrl}`} alt={item.title} />
                            <div className="blog-content">
                                <h3>{item.title}</h3>
                                <a href={`/blog/${item.id}`}>Đọc bài viết →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PageFooter />
        </>
    );
}

export default BlogDetail;