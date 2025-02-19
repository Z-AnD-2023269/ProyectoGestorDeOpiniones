`use strict`;

import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        maxLength: [100, "El título no puede exceder 100 caracteres"]
    },
    category: {
        type: String,
        required: [true, "El contenido de la publicación es obligatorio"]
    },
    content: {
        type: String,
        required: [true, "The post content is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"]
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    status: {
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
