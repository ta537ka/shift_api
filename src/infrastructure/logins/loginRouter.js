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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const LoginController_1 = require("../../interface/controller/LoginController");
const MysqlConnection_1 = require("../MysqlConnection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysqlConnection = new MysqlConnection_1.MysqlConnection();
const loginController = new LoginController_1.LoginController(mysqlConnection);
const loginRouter = express_1.default.Router();
const jwt_env = 'my_secret';
loginRouter.post('/login/admins', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loginController.findUserByAdmin(req, res, next);
    const lists = result;
    const { id, username, password } = req.body;
    try {
        if (!lists.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        if (password != lists[0].password) {
            return res.status(400).json({ message: 'invalid password' });
        }
        // tokenの発行(シークレットは環境変数から呼び出す)
        const token = jsonwebtoken_1.default.sign({ id }, jwt_env);
        res.status(200).json({
            id: id,
            token: token
        });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
    // res.send(result);
}));
loginRouter.post('/login/staffs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loginController.findUserByStaff(req, res);
    console.log(result);
    res.send(result);
}));
exports.default = loginRouter;
