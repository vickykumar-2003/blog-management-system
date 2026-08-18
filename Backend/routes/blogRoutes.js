import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    getMyBlogs,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/my", protect, getMyBlogs); // Must be before /:id
router.get("/:id", getBlogById);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
