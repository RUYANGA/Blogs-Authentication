"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const allowedFormat = ['.jpg', '.png', '.jpeg', '.gif', '.webp'];
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const fileFilter = (req, file, cb) => {
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedFormat.includes(`${ext}`)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Invalid file format type must be in ${allowedFormat}`));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
