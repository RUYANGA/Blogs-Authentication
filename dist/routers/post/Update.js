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
exports.updatePostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const common_1 = require("../../common");
const router = (0, express_1.Router)();
exports.updatePostRouter = router;
router.post('/post/update/:id', common_1.requireOwner, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const { title, content } = req.body;
    if (!postId)
        return next(new Error('Post id required'));
    let updatePost;
    try {
        updatePost = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { $set: { title, content } }, { new: true });
    }
    catch (err) {
        next(new Error('Post can not updated'));
    }
    res.status(200).json({ message: updatePost });
}));
