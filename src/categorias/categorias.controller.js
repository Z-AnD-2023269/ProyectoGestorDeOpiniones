"use strict";

import Category from "./categorias.model.js";
import Publication from "../publicaciones/publicaciones.model.js";


export const defaultCategory = async () => {
    const firstCategory = {
        "name": "Deportes",
        "description": "Categoría para publicaciones relacionadas con eventos deportivos, noticias y actividades atléticas."
    }

    const category = await Category.findOne({ name: firstCategory.name })
    if (!category) {
        await Category.create(firstCategory);
        console.log(`Categoría predeterminada creada: ${firstCategory.name}`)
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: true });
        return res.status(200).json({
            success: true,
            categories
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving categories",
            error: err.message
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "El nombre de la categoría es obligatorio"
            })
        }

        const category = new Category({
            name,
            description 
        })

        await category.save();

        return res.status(201).json({
            success: true,
            message: "Categoría creada con éxito",
            category
        })

    } catch (err) {
        console.error("Error en createCategory:", err)
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoría",
            error: err.message
        })
    }    
}

export const updateCategory = async (req, res) => {
    try {
        const { name, newName, description } = req.body;

        const category = await Category.findOne({ name });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la categoría: ${name}`
            })
        }

        if (newName && newName !== name) {
            const existingCategory = await Category.findOne({ name: newName });
            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: `Ya existe una categoría con el nombre: ${newName}`
                })
            }
            category.name = newName; 
        }

        if (description) {
            category.description = description;
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Categoría actualizada con éxito",
            category
        })
    } catch (err) {
        console.error("Error en updateCategory:", err);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: err.message
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.findOne({ name });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la categoría: ${name}`
            });
        }

        category.status = false;
        await category.save();

        await Publication.updateMany({ category: category._id }, { category: null });

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada con éxito",
            category
        })
    } catch (err) {
        console.error("Error en deleteCategory:", err);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message
        })
    }
}

