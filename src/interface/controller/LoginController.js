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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
require('dotenv').config();
const GetUserByAdmin_1 = require("../../usecase/logins/GetUserByAdmin");
const GetUserByStaff_1 = require("../../usecase/logins/GetUserByStaff");
const LoginRepository_1 = require("../database/LoginRepository");
const LoginSerializer_1 = require("../serializer/LoginSerializer");
const bcrypt = require("bcryptjs");
class LoginController {
    constructor(dbConnection) {
        this.loginSerializer = new LoginSerializer_1.LoginSerializer();
        this.loginRepository = new LoginRepository_1.LoginRepository(dbConnection);
    }
    findUserByAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const useCase = new GetUserByAdmin_1.GetUserByAdmin(this.loginRepository);
            try {
                const result = yield useCase.excute(username);
                // // 入力したユーザ名に一致するユーザが存在しない場合
                // if (!Object.keys(result).length) {
                //     const error = new Error(`The Username "${username}" was not found`);
                //     console.log(error);
                //     next(error);
                // }
                // // パスワードが一致しているかどうか
                // const user = Object.values(result);
                // var token;
                // if (password == user[0].password) {
                //     // 現状使用できない
                //     const secret = process.env.JWT_SECRET;
                //     const expire = process.env.JWT_EXPIRATION;
                //     // 後で変更する
                //     token = jwt.sign({ id: user[0].id }, 'my_Secret');
                // }
                return this.loginSerializer.serialize(result);
                // tokenを返す
                // res.json({
                //     id: user[0].id,
                //     token: token
                // });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
    findUserByStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const useCase = new GetUserByStaff_1.GetUserByStaff(this.loginRepository);
            const result = yield useCase.excute(username);
            return this.loginSerializer.serialize(result);
        });
    }
}
exports.LoginController = LoginController;
