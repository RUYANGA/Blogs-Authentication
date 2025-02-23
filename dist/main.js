"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const routers_1 = require("./routers");
const common_1 = require("./common");
const signout_1 = require("./routers/auth/signout");
const url = process.env.MONGODB_URL;
const Port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.set('trust proxy', true);
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false
}));
app.use((0, cors_1.default)({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express_1.default.urlencoded({ extended: false }));
mongoose_1.default.connect(url).then(() => {
    console.log('MongoDb connected successfuly');
    app.listen(Port, () => {
        console.log(`Server is running at http://localhost/${Port} port`);
    });
}).catch((error) => {
    console.log('Error to connect DB', error);
});
//Post routers
app.use(routers_1.signupRouter);
app.use(routers_1.signinRouter);
app.use(routers_1.showPostRouter);
app.use(signout_1.signoutRouter);
app.use(common_1.currentUser);
app.use(common_1.requireAuth, routers_1.newPostRouter);
app.use(common_1.requireAuth, routers_1.updatePostRouter);
app.use(common_1.requireAuth, routers_1.deletePostRouter);
app.use(common_1.requireAuth, routers_1.updateUserRouter);
app.use(common_1.requireAuth, routers_1.deleteUserRouter);
app.use(common_1.requireAuth, routers_1.newCommentRouter);
app.use(common_1.requireAuth, routers_1.deleteCommentRouter);
app.all('*', (req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});
//Error handling Mindleware
app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: error.message || "Something went wrong" });
    return;
});
