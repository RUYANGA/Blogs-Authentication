"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const express_1 = require("express");
const common_1 = require("../../common");
const router = (0, express_1.Router)();
exports.currentUser = router;
router.get('/current-user', common_1.currentUser, (req, res, net) => {
    res.status(200).json({ currentUser: req.currentUser });
});
