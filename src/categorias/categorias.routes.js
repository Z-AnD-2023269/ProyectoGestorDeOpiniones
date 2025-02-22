"use strict";

import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "./categorias.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /category/getCategories:
 *   get:
 *     summary: Obtener todas las categorías activas
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", getCategories);


/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Crear una nueva categoría (Solo administrador)
 *     tags: [Categorías]
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: La categoría ya existe
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /category/updateCategory:
 *   put:
 *     summary: Actualizar una categoría existente (Solo administrador)
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/updateCategory", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /category/deleteCategory:
 *   delete:
 *     summary: Eliminar una categoría (Solo administrador)
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/deleteCategory", deleteCategoryValidator, deleteCategory);

export default router;
