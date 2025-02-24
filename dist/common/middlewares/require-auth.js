"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    if (!req.currentUser)
        return next(new Error('Not authorized'));
    next();
};
exports.requireAuth = requireAuth;
