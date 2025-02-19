"use strict";

import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"],
        maxLength: [100, "El título no puede exceder 100 caracteres"]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "La categoría es obligatoria"]
    },
    contenido: {
        type: String,
        required: [true, "El contenido de la publicación es obligatorio"]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

publicacionSchema.methods.toJSON = function() {
    const { _id, ...publicacion } = this.toObject();
    publicacion.uid = _id;
    return publicacion;
};

export default model("Publicacion", publicacionSchema);
