"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const Comment_1 = __importDefault(require("../../modeles/Comment"));
const router = (0, express_1.Router)();
exports.deleteCommentRouter = router;
router.delete('/comment/:commentId/delete/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, postId } = req.params;
    if (!postId)
        return next(new Error('Post id required'));
    if (!commentId)
        return next(new Error('Comment id required'));
    try {
        const deleteCom = yield Comment_1.default.findByIdAndDelete({ _id: commentId });
    }
    catch (error) {
        next(new Error('Comment can not deleted'));
    }
    const post = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { $pull: { comment: commentId } });
    res.status(200).json({ message: post });
}));
