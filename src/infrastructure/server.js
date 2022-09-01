"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const staffRouter_1 = __importDefault(require("./staffs/staffRouter"));
const adminRouter_1 = __importDefault(require("./admins/adminRouter"));
const shiftStatusRouter_1 = __importDefault(require("./shift_statuses/shiftStatusRouter"));
const shiftRouter_1 = __importDefault(require("./shifts/shiftRouter"));
const completeShiftRouter_1 = __importDefault(require("./complete_shifts/completeShiftRouter"));
const app = (0, express_1.default)();
const port = 3001;
const cors = require('cors');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/api', staffRouter_1.default, adminRouter_1.default, shiftStatusRouter_1.default, shiftRouter_1.default, completeShiftRouter_1.default);
app.listen(port, () => {
    console.log(`listening port is ${port}`);
});
exports.default = app;
