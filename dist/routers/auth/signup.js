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
exports.signupRouter = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../../modeles/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
exports.signupRouter = router;
router.post('/user/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username)
        return next(new Error('Username is required'));
    if (!email)
        return next(new Error('Email is required'));
    if (!password)
        return next(new Error('Password is required'));
    const existUser = yield user_1.default.findOne({ email: email });
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    if (existUser)
        return next(new Error('User with the same email already exist'));
    const newUser = user_1.default.build({
        username,
        email,
        password: hashPassword,
    });
    yield newUser.save();
    req.session = {
        jwt: jsonwebtoken_1.default.sign({
            email: newUser.email,
            id: newUser._id,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_KEY, {
            expiresIn: '20day'
        })
    };
    res.status(201).json({ User: newUser });
}));
