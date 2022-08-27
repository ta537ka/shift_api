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
const StaffController_1 = require("../../interface/controller/StaffController");
const MysqlConnection_1 = require("../MysqlConnection");
const mysqlConnection = new MysqlConnection_1.MysqlConnection();
const staffController = new StaffController_1.StaffController(mysqlConnection);
const staffRouter = express_1.default.Router();
staffRouter.get('/staffs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staffController.findStaff(req, res);
    res.send(result);
}));
staffRouter.get('/staffs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield staffController.findAll(req, res);
    res.send(results);
}));
staffRouter.post('/staffs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staffController.createStaff(req, res);
    res.send(result);
}));
staffRouter.put('/staffs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staffController.updateStaff(req, res);
    res.send(result);
}));
staffRouter.delete('/staffs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staffController.deleteStaff(req, res);
    res.send(result);
}));
exports.default = staffRouter;
