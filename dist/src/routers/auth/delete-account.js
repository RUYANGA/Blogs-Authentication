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
exports.deleteUserRouter = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../../modeles/user"));
const router = (0, express_1.Router)();
exports.deleteUserRouter = router;
router.delete('/user/delete/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId)
        return next(new Error('Post id required'));
    let updateUser;
    try {
        updateUser = yield user_1.default.findByIdAndDelete({ _id: userId });
    }
    catch (err) {
        next(new Error('Post can not updated'));
    }
    res.status(200).json({ message: "User deleted successfuly" });
}));
