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
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../../interface/controller/AdminController");
const MysqlConnection_1 = require("../MysqlConnection");
const mysqlConnection = new MysqlConnection_1.MysqlConnection();
const adminController = new AdminController_1.AdminController(mysqlConnection);
const adminRouter = express_1.default.Router();
adminRouter.get('/admins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield adminController.findAll(req, res);
    res.send(results);
}));
adminRouter.get('/admins/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminController.findAdmin(req, res);
    res.send(result);
}));
adminRouter.post('/admins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminController.createAdmin(req, res);
    res.send(result);
}));
adminRouter.put('/admins/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminController.updateAdmin(req, res);
    res.send(result);
}));
adminRouter.delete('/admins/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminController.deleteAdmin(req, res);
    res.send(result);
}));
exports.default = adminRouter;
