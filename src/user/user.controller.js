import { hash, verify } from "argon2";
import Usuario from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            usuario
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query).skip(Number(desde)).limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            usuarios
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { usuario } = req;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuario.uid, { estado: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            usuario: usuarioActualizado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nuevaContrasena } = req.body;

        const usuario = await Usuario.findById(uid);
        const mismaContrasena = await verify(usuario.password, nuevaContrasena);

        if (mismaContrasena) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const contrasenaEncriptada = await hash(nuevaContrasena);
        await Usuario.findByIdAndUpdate(uid, { password: contrasenaEncriptada }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const datos = req.body;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, datos, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            usuario: usuarioActualizado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: err.message
        });
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        const nuevaFoto = req.file ? req.file.filename : null;

        if (!nuevaFoto) {
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición"
            });
        }

        const usuario = await Usuario.findById(uid);
        if (usuario.fotoPerfil) {
            const fotoAntigua = join(__dirname, "../../public/uploads/profile-pictures", usuario.fotoPerfil);
            await fs.unlink(fotoAntigua);
        }

        usuario.fotoPerfil = nuevaFoto;
        await usuario.save();

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            fotoPerfil: usuario.fotoPerfil
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message
        });
    }
}
