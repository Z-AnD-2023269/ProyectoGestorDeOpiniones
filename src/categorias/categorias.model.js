"use strict";

import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 50 characters"],
        unique: true
    },
    description: {
        type: String,
        maxLength: [200, "Description cannot exceed 200 characters"]
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

categorySchema.methods.toJSON = function() {
    const { _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

export default model("Category", categorySchema)
