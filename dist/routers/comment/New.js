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
exports.newCommentRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const Comment_1 = __importDefault(require("../../modeles/Comment"));
const router = (0, express_1.Router)();
exports.newCommentRouter = router;
router.post('/comment/new/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { username, content } = req.body;
        if (!postId)
            return next(new Error('Post id required'));
        if (!content)
            return next(new Error('Content required'));
        const newComments = Comment_1.default.build({
            username: username ? username : 'Merci',
            content
        });
        yield newComments.save();
        const updatePost = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { $push: { comment: newComments } }, { new: true });
        res.status(200).json({ message: updatePost });
    }
    catch (error) {
        next(new Error('Comment can not created'));
    }
}));
