import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo">Blog Management System</Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {!user ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register" className="btn btn-primary">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/my-blogs">My Blogs</Link></li>
                            <li><Link to="/create-blog">Create Blog</Link></li>
                            <li className="user-greeting">Hi, {user.name}</li>
                            <li><button onClick={handleLogout} className="btn btn-danger">Logout</button></li>
                        </>
                    )}
                    <li>
                        <button onClick={toggleTheme} className="btn btn-secondary theme-toggle">
                            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
