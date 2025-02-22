"use strict";

import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { handleErrors } from "./handle-errors.js";
import { publicationExistsById } from "../helpers/db-validators.js";

export const createPublicationValidator = [
    validateJWT,
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("category").notEmpty().withMessage("La categoría es obligatoria"),
    body("content").notEmpty().withMessage("El contenido es obligatorio"),
    validarCampos,
    handleErrors
]

export const updatePublicationValidator = [
    validateJWT,
    param("id").custom(publicationExistsById).withMessage("La publicación no existe"),
    body("title").optional().notEmpty().withMessage("El título no puede estar vacío"),
    body("category").optional().notEmpty().withMessage("La categoría no puede estar vacía"),
    body("content").optional().notEmpty().withMessage("El contenido no puede estar vacío"),
    validarCampos,
    handleErrors
]

export const deletePublicationValidator = [
    validateJWT,
    param("id").custom(publicationExistsById).withMessage("La publicación no existe"),
    validarCampos,
    handleErrors
]

export const getPublicationsValidator = [
    validarCampos,
    handleErrors
]
