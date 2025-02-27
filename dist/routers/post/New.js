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
exports.newPostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const user_1 = __importDefault(require("../../modeles/user"));
const cloudinaryConfg_1 = __importDefault(require("../../common/utile/cloudinaryConfg"));
const multer_1 = __importDefault(require("../../common/utile/multer"));
const router = (0, express_1.Router)();
exports.newPostRouter = router;
router.post('/post/new/:id', multer_1.default.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            const error = new Error('Image required');
            error.status = 400;
            return next(error);
        }
        const resultImage = yield cloudinaryConfg_1.default.uploader.upload(req.file.path, {
            folder: 'uploads'
        });
        console.log('images', resultImage);
        const { title, content } = req.body;
        const Id = req.params.id;
        const userId = yield user_1.default.findById(Id);
        if (!userId)
            return next(new Error('User id required or not exist'));
        if (!title) {
            const error = new Error('Title is required');
            error.status = 400;
            return next(error);
        }
        if (!content) {
            const error = new Error('Content is require');
            error.status = 400;
            return next(error);
        }
        const savePost = Post_1.default.build({
            user: Id,
            title,
            content,
            images: resultImage.secure_url
        });
        yield savePost.save();
        yield user_1.default.findByIdAndUpdate({ _id: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id }, { $push: { posts: savePost._id } });
        res.status(200).json({ Posts: savePost });
    }
    catch (err) {
        const error = new Error('Post can not created');
        error.status = 500;
        return next(error);
        console.log(err);
    }
}));
