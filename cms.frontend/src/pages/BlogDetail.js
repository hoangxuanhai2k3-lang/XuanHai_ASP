import React, { useEffect, useState } from "react";
import homeService from "../services/homeService";

import "../App.css";

const API_URL = "https://localhost:7132";

function BlogDetail() {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState({ name: "", email: "", content: "" });
    const [approvedComments, setApprovedComments] = useState([]);

    const id = Number(window.location.pathname.split("/").pop());

    useEffect(() => {
        homeService.getPosts().then(setPosts);
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/PostComments/post/${id}`)
            .then((res) => res.json())
            .then((data) => setApprovedComments(data))
            .catch(() => setApprovedComments([]));
    }, [id]);

    const post = posts.find((x) => Number(x.id) === id);
    const related = posts.filter((x) => Number(x.id) !== id).slice(0, 3);

    const sendComment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/PostComments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: post.id,
                    fullName: comment.name,
                    email: comment.email,
                    content: comment.content
                })
            });

            if (!response.ok) {
                alert("Gửi bình luận thất bại. Vui lòng kiểm tra Backend.");
                return;
            }

            alert("Bình luận đã gửi và chờ Admin duyệt!");
            setComment({ name: "", email: "", content: "" });
        } catch {
            alert("Không kết nối được đến API bình luận.");
        }
    };

    if (posts.length === 0) {
        return (
            <>
                <div className="page-container">Đang tải bài viết...</div>
                
            </>
        );
    }

    if (!post) {
        return (
            <>
                <div className="page-container">
                    Không tìm thấy bài viết có ID = {id}
                </div>
              
            </>
        );
    }

    return (
        <>
       

            <div className="page-container blog-detail-layout">
                <main>
                    <div className="breadcrumb">
                        Trang chủ / Tin tức / {post.title}
                    </div>

                    <h1>{post.title}</h1>

                    <p className="post-date">
                        📅 {new Date(post.createdDate).toLocaleDateString("vi-VN")}
                    </p>

                    <img
                        className="post-main-img"
                        src={`${API_URL}${post.imageUrl}`}
                        alt={post.title}
                    />

                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{
                            __html:
                                post.content +
                                `
                                <h2>Gợi ý phối đồ từ HaiCMS Fashion</h2>
                                <p>Khi lựa chọn trang phục, bạn nên ưu tiên chất liệu, phom dáng và màu sắc phù hợp với hoàn cảnh sử dụng.</p>
                                <p>Đối với các buổi tiệc hoặc sự kiện, bạn có thể chọn các mẫu đầm có điểm nhấn nhẹ để tạo cảm giác sang trọng.</p>
                                <h2>Kết luận</h2>
                                <p>Thời trang không chỉ là quần áo mà còn là cách thể hiện phong cách sống.</p>
                                `
                        }}
                    />

                    <section className="comment-box">
                        <h2>Bình luận bài viết</h2>

                        <form onSubmit={sendComment}>
                            <input
                                placeholder="Họ tên"
                                value={comment.name}
                                onChange={(e) =>
                                    setComment({ ...comment, name: e.target.value })
                                }
                                required
                            />

                            <input
                                placeholder="Email"
                                value={comment.email}
                                onChange={(e) =>
                                    setComment({ ...comment, email: e.target.value })
                                }
                                required
                            />

                            <textarea
                                placeholder="Nội dung bình luận"
                                value={comment.content}
                                onChange={(e) =>
                                    setComment({ ...comment, content: e.target.value })
                                }
                                required
                            />

                            <button type="submit">Gửi bình luận</button>
                        </form>

                        <div className="approved-comments">
                            <h3>Bình luận đã duyệt</h3>

                            {approvedComments.length === 0 ? (
                                <p>Chưa có bình luận nào.</p>
                            ) : (
                                approvedComments.map((item) => (
                                    <div className="comment-item" key={item.id}>
                                        <strong>{item.fullName}</strong>
                                        <p>{item.content}</p>
                                        <small>
                                            {new Date(item.createdDate).toLocaleString("vi-VN")}
                                        </small>
                                    </div>
                                ))
                            )}
                        </div>
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

           
        </>
    );
}

export default BlogDetail;