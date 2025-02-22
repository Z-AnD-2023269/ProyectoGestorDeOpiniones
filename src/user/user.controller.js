import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const defaultUserAdmin = async () => {
    const defaultUser = {
        "name": "Anderson",
        "surname": "López",
        "username": "ZiloyTA59",
        "email": "alopez-2023269@gmail.com",
        "password": "Ziloyta.269",
        "profilePicture": "xd un perro con traje.jpg",
        "role": "ADMIN_ROLE"
    }

    const user = await User.findOne({email: defaultUser.email})
    if(!user){
        defaultUser.password =  await hash(defaultUser.password)
        await User.create(defaultUser)
        console.log(`Admin creado email: ${defaultUser.email}, Username: ${defaultUser.username}, Contraseña: Ja123456#`)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { _id } = req.usuario
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message,
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { _id } = req.usuario;
        const { oldPassword, newPassword } = req.body

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            })
        }

        const isOldPasswordCorrect = await verify(user.password, oldPassword);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "La contraseña actual es incorrecta",
            })
        }

        if (await verify(user.password, newPassword)) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior",
            })
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(_id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message,
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { _id } = req.usuario;
        const data = req.body;

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado",
            })
        }

        const updatedUser = await User.findByIdAndUpdate(_id, data, { new: true })

        res.status(200).json({
            success: true,
            msg: "Usuario actualizado",
            user: updatedUser,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar usuario",
            error: err.message,
        })
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { _id } = req.usuario
        let newProfilePicture = req.file ? req.file.filename : null

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición",
            })
        }

        const user = await User.findById(_id);

        if (user.profilePicture) {
            const oldProfilePicture = join(
                __dirname,
                "../../public/uploads/profile-pictures",
                user.profilePicture
            );
            await fs.unlink(oldProfilePicture);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            profilePicture: user.profilePicture,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message,
        })
    }
}