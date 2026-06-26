import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://localhost:7132";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/Posts/${id}`)
            .then((res) => setPost(res.data))
            .catch(() => alert("Không tìm thấy bài viết"));
    }, [id]);

    if (!post) return <p>Đang tải...</p>;

    return (
        <div className="post-detail-page">
            <img src={`${API_URL}${post.imageUrl}`} alt={post.title} />

            <h1>{post.title}</h1>

            <p className="post-date">
                Ngày đăng: {new Date(post.createdDate).toLocaleDateString("vi-VN")}
            </p>

            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            <a href="/" className="outline-btn">
                Quay lại trang chủ
            </a>
        </div>
    );
}

export default PostDetail;