import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                setBlog(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load blog");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await api.delete(`/blogs/${id}`);
                navigate("/my-blogs");
            } catch (err) {
                alert(err.response?.data?.message || "Failed to delete blog");
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="container page-content">
            <Link to="/" className="btn btn-secondary back-btn">← Back to Home</Link>
            <div className="blog-details-card">
                <h1 className="blog-details-title">{blog.title}</h1>
                <p className="blog-details-meta">
                    By <strong>{blog.author?.name}</strong> on {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                {user && user.id === blog.author?._id && (
                    <div className="blog-actions">
                        <Link to={`/edit-blog/${blog._id}`} className="btn btn-primary">Edit</Link>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                )}

                <div className="blog-details-content">
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
