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
exports.updateUserRouter = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../../modeles/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
exports.updateUserRouter = router;
router.patch('/user/update/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    if (!userId)
        return next(new Error('Post id required'));
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    let updateUser;
    try {
        updateUser = yield user_1.default.findByIdAndUpdate({ _id: userId }, { $set: { username, email, password: hashPassword } }, { new: true });
    }
    catch (err) {
        next(new Error('Post can not updated'));
    }
    res.status(200).json({ message: updateUser });
}));
