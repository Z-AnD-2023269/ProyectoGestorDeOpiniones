import { request, response } from "express"
import Publication from "./publicaciones.model.js"
import Category from "../categorias/categorias.model.js"

export const createPublication = async (req = request, res = response) => {
    try {
        const { title, category: categoryName, content } = req.body;
        const userId = req.usuario.id;

        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }

        const newPublication = new Publication({
            title,
            category: category._id,  
            content,
            user: userId
        });

        await newPublication.save();

        const populatedPublication = await Publication.findById(newPublication._id)
            .populate("user")
            .populate("category");

        res.status(201).json({
            success: true,
            message: "Publication created successfully",
            data: populatedPublication
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

export const updatePublication = async (req = request, res = response) => {
    try {
        const { id, title, category, content } = req.body;
        const userId = req.usuario.id;

        const publication = await Publication.findById(id).populate("user");
        if (!publication || publication.user._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You can only edit your own publications" })
        }

        publication.title = title;
        publication.category = category;
        publication.content = content;
        await publication.save();

        res.json({ success: true, message: "Publication updated successfully", data: publication })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

export const deletePublication = async (req = request, res = response) => {
    try {
        const { id } = req.body;
        const userId = req.usuario.id;

        const publication = await Publication.findById(id).populate("user");
        if (!publication || publication.user._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You can only delete your own publications" })
        }

        await publication.deleteOne()
        res.json({ success: true, message: "Publication deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

export const getPublications = async (req = request, res = response) => {
    try {
        const publications = await Publication.find({ status: true }).populate("user");
        res.json({ success: true, data: publications })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
