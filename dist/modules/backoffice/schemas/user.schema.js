"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        trim: true,
    },
    phones: [
        {
            number: {
                type: String,
            },
            ddd: {
                type: String,
            },
        },
    ],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    lastLogin: {
        type: Date,
    },
    token: {
        type: String,
    },
});
//# sourceMappingURL=user.schema.js.map