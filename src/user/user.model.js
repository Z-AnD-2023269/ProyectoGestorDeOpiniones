import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxLength: [25, "El nombre no puede exceder 25 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        maxLength: [25, "El apellido no puede exceder 25 caracteres"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    fotoPerfil: {
        type: String
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

usuarioSchema.methods.toJSON = function() {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model("Usuario", usuarioSchema);
