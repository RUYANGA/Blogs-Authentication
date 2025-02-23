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
exports.deletePostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../modeles/Post"));
const user_1 = __importDefault(require("../../modeles/user"));
const common_1 = require("../../common");
const router = (0, express_1.Router)();
exports.deletePostRouter = router;
router.delete('/post/delete/:id', common_1.requireOwner, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = req.params.id;
    if (!postId)
        return next(new Error('Post id required'));
    try {
        yield Post_1.default.findByIdAndDelete({ _id: postId });
    }
    catch (error) {
        next(new Error('Post can not be deleted'));
    }
    const user = yield user_1.default.findOneAndUpdate({ _id: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id }, { $pull: { posts: postId } }, { new: true });
    if (!user)
        return next(new Error('Can not update user'));
    res.status(200).json({ message: user });
}));
