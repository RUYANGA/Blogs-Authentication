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
exports.requireOwner = void 0;
const Post_1 = __importDefault(require("../../modeles/Post"));
const requireOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const post = yield Post_1.default.findById(req.params.id);
    if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id) !== (post === null || post === void 0 ? void 0 : post.user.toString()))
        return next(new Error('Owner access required'));
    console.log((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.isAdmin);
    console.log(post === null || post === void 0 ? void 0 : post.user);
    console.log((_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id);
    next();
});
exports.requireOwner = requireOwner;
