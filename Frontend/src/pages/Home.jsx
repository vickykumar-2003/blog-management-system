import React, { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get("/blogs");
                setBlogs(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch blogs");
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="error-message container">{error}</div>;

    return (
        <div className="container page-content">
            <h1 className="page-title">Latest Blogs</h1>
            {blogs.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
