import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                setTitle(data.data.title);
                setContent(data.data.content);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch blog");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/blogs/${id}`, { title, content });
            navigate(`/blog/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update blog");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container page-content">
            <div className="form-card">
                <h1>Edit Blog</h1>
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
                    <button type="submit" className="btn btn-primary w-100">Update Blog</button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
