"use strict";

import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
        maxLength: [100, "The title cannot exceed 100 characters"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "The category is required"]
    },
    content: {
        type: String,
        required: [true, "The content is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
})

publicationSchema.methods.toJSON = function() {
    const { _id, ...publication } = this.toObject();
    publication.uid = _id;
    return publication;
}

export default model("Publication", publicationSchema)
