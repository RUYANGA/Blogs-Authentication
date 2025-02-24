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
exports.signinRouter = void 0;
const user_1 = __importDefault(require("../../modeles/user"));
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
exports.signinRouter = router;
router.post('/user/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email)
        return next(new Error('Email is required'));
    if (!password)
        return next(new Error('Password is required'));
    const userExist = yield user_1.default.findOne({ email: email });
    if (!userExist)
        return next(new Error('Wronge credetials'));
    const comprePassword = yield bcrypt_1.default.compare(password, userExist.password);
    if (!comprePassword)
        return next(new Error('Wronge credetials'));
    const token = jsonwebtoken_1.default.sign({
        email: userExist.email,
        id: userExist._id,
        isAdmin: userExist.isAdmin
    }, process.env.JWT_KEY, {
        expiresIn: '20day'
    });
    req.session = { jwt: token };
    res.status(200).json({ User: userExist });
}));
