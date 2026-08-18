import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await api.post("/blogs", { title, content });
            navigate(`/blog/${data.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create blog");
        }
    };

    return (
        <div className="container page-content">
            <div className="form-card">
                <h1>Create New Blog</h1>
                {error && <div className="error-alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            minLength="3"
                            maxLength="150"
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog content here..."
                            rows="10"
                            minLength="10"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Publish Blog</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
