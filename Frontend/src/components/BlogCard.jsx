import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="blog-card">
            <div className="blog-card-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-meta">
                    By {blog.author?.name} | {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="blog-preview">
                    {blog.content.length > 100
                        ? blog.content.substring(0, 100) + "..."
                        : blog.content}
                </p>
                <Link to={`/blog/${blog._id}`} className="btn btn-outline">Read More</Link>
            </div>
        </div>
    );
};

export default BlogCard;
