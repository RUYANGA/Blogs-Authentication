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
exports.showPostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const router = (0, express_1.Router)();
exports.showPostRouter = router;
router.get('/post/show/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.body;
        if (postId)
            return next(yield Post_1.default.findById({ _id: postId }));
        const showPost = yield Post_1.default.find().populate("comment").populate("user");
        res.status(200).json({ Posts: showPost });
    }
    catch (err) {
        next(new Error('Post can not show'));
    }
}));
