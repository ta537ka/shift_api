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
const CompleteShiftLogController_1 = require("../../interface/controller/CompleteShiftLogController");
const MysqlConnection_1 = require("../MysqlConnection");
const mysqlConnection = new MysqlConnection_1.MysqlConnection();
const completeShiftLogController = new CompleteShiftLogController_1.CompleteShiftLogController(mysqlConnection);
const completeShiftLogRouter = express_1.default.Router();
//admin and staff
completeShiftLogRouter.get('/complete_shift_logs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield completeShiftLogController.findAll(req, res);
    res.send(results);
}));
completeShiftLogRouter.get('/complete_shift_logs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftLogController.findCompleteShiftLog(req, res);
    res.send(result);
}));
//admin
completeShiftLogRouter.post('/complete_shift_logs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftLogController.createCompleteShiftLog(req, res);
    res.send(result);
}));
completeShiftLogRouter.put('/copmlete_shift_logs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftLogController.updateCompleteShiftLog(req, res);
    res.send(result);
}));
completeShiftLogRouter.delete('/complete_shift_logs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftLogController.DeleteCompleteShiftLog(req, res);
    res.send(result);
}));
exports.default = completeShiftLogRouter;
