"use strict";

import { body } from "express-validator";
import { nameCategoryExist, categoryExistsByName } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js"

export const createCategoryValidator = [
    validateJWT, 
    hasRoles("ADMIN_ROLE"),
    body("name", "El nombre de la categoría es requerido").notEmpty(),body("name").custom(nameCategoryExist),
    body("description").optional().isLength({ max: 300 }).withMessage("La descripción no puede exceder los 300 caracteres"),
    validarCampos, 
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la categoría es obligatorio"),
    body("name").custom(categoryExistsByName).withMessage("La categoría no existe"),
    body("newName").optional().isString().custom(nameCategoryExist).withMessage("El nuevo nombre ya está en uso"),
    body("description").optional().isLength({ max: 300 }).withMessage("La descripción no puede superar los 300 caracteres"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la categoría es obligatorio"),
    body("name").custom(categoryExistsByName).withMessage("La categoría no existe"), 
    validarCampos,
    handleErrors
]
