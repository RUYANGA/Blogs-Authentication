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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
//Post routers
__exportStar(require("./post/New"), exports);
__exportStar(require("./post/Show"), exports);
__exportStar(require("./post/Update"), exports);
__exportStar(require("./post/Delete"), exports);
//Comment routers
__exportStar(require("./comment/New"), exports);
__exportStar(require("./comment/Delete"), exports);
__exportStar(require("./auth/signup"), exports);
__exportStar(require("./auth/signin"), exports);
__exportStar(require("./auth/signout"), exports);
__exportStar(require("./auth/current-user"), exports);
__exportStar(require("./auth/update-user"), exports);
__exportStar(require("./auth/delete-account"), exports);
