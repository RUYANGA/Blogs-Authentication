"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchem = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
});
userSchem.statics.build = (createUserDto) => {
    return new User(createUserDto);
};
const User = mongoose_1.default.model('User', userSchem);
exports.default = User;
