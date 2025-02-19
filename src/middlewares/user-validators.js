"use strict";

import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username en formato erróneo"),
    body("password").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    body("oldPassword").notEmpty().withMessage("Debe ingresar la contraseña actual"),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
]
