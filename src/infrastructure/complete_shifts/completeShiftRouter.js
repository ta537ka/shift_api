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
const CompleteShiftController_1 = require("../../interface/controller/CompleteShiftController");
const MysqlConnection_1 = require("../MysqlConnection");
const mysqlConnection = new MysqlConnection_1.MysqlConnection();
const completeShiftController = new CompleteShiftController_1.CompleteShiftController(mysqlConnection);
const completeShiftRouter = express_1.default.Router();
//admin
completeShiftRouter.get('/admin/complete_shifts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield completeShiftController.findAllByAdmin(req, res);
    res.send(results);
}));
completeShiftRouter.get('/admin/complete_shifts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftController.findCompleteShift(req, res);
    res.send(result);
}));
completeShiftRouter.post('/admin/complete_shifts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftController.createCompleteShift(req, res);
    res.send(result);
}));
completeShiftRouter.put('/admin/complete_shifts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftController.updateCompleteShit(req, res);
    res.send(result);
}));
completeShiftRouter.delete('/admin/complete_shifts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield completeShiftController.deleteCompleteShift(req, res);
    res.send(result);
}));
//staff
completeShiftRouter.get('/staff/complete_shifts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield completeShiftController.findAllByStaff(req, res);
    res.send(results);
}));
exports.default = completeShiftRouter;
