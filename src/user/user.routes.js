"use strict";

import { Router } from "express";
import { getUserById, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /users/findUser:
 *   get:
 *     summary: Obtiene los datos del usuario autenticado
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/findUser", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /users/updatePassword:
 *   patch:
 *     summary: Actualiza la contraseña del usuario autenticado
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Actualiza los datos del usuario autenticado
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/updateUser", updateUserValidator, updateUser);

/**
 * @swagger
 * /users/updateProfilePicture:
 *   patch:
 *     summary: Actualiza la foto de perfil del usuario autenticado
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada correctamente
 *       400:
 *         description: No hay archivo en la petición
 */
router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router;
