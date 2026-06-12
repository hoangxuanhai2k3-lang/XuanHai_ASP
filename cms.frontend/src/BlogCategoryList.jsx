import React, { useEffect, useState } from "react";
import homeService from "./services/homeService";

function BlogCategoryList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await homeService.getPosts();
                setPosts(data);
            } catch {
                setError("Không lấy được danh sách bài viết.");
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) {
        return <div className="loading-box">Đang tải bài viết...</div>;
    }

    if (error) {
        return <div className="error-box">{error}</div>;
    }

    return (
        <section id="blog" className="blog-section">
            <h2>XU HƯỚNG THỜI TRANG</h2>
            <p>Cập nhật mẹo phối đồ và xu hướng mới nhất cùng HaiCMS</p>

            {posts.length === 0 ? (
                <div className="empty-box">
                    Chưa có bài viết nào.
                </div>
            ) : (
                <div className="blog-grid">
                    {posts.slice(0, 3).map((post) => (
                        <div className="blog-card" key={post.id}>
                            <img
                                src={`https://localhost:7132${post.imageUrl}`}
                                alt={post.title}
                            />

                            <div className="blog-content">
                                <small>
                                    📅 {new Date(post.createdDate).toLocaleDateString("vi-VN")}
                                </small>

                                <h3>{post.title}</h3>

                                <p>
                                    {post.content?.replace(/<[^>]+>/g, "").substring(0, 90)}...
                                </p>

                                <a href={`/blog/${post.id}`}>Đọc bài viết →</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default BlogCategoryList;