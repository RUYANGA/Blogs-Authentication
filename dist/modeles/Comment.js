"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchem = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
commentSchem.statics.build = (createCommentDto) => {
    return new Comment(createCommentDto);
};
const Comment = mongoose_1.default.model("Comment", commentSchem);
exports.default = Comment;
