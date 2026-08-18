import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyBlogs = async () => {
        try {
            const { data } = await api.get("/blogs/my");
            setBlogs(data.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch your blogs");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await api.delete(`/blogs/${id}`);
                fetchMyBlogs();
            } catch (err) {
                alert(err.response?.data?.message || "Failed to delete blog");
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="container page-content">
            <div className="flex-between">
                <h1 className="page-title">My Blogs</h1>
                <Link to="/create-blog" className="btn btn-primary">Create New Blog</Link>
            </div>

            {blogs.length === 0 ? (
                <EmptyState message="You haven't published any blogs yet." />
            ) : (
                <div className="table-responsive">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Published Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-info">View</Link>
                                            <Link to={`/edit-blog/${blog._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                            <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBlogs;
