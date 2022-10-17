require('dotenv').config();
import { GetUserByAdmin } from "../../usecase/logins/GetUserByAdmin";
import { GetUserByStaff } from "../../usecase/logins/GetUserByStaff";
import { IDBConnection } from "../database/IDBConnection";
import { LoginRepository } from "../database/LoginRepository";
import { LoginSerializer } from "../serializer/LoginSerializer";


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export class LoginController {
    private loginSerializer: LoginSerializer;
    private loginRepository: LoginRepository;

    constructor(dbConnection: IDBConnection) {
        this.loginSerializer = new LoginSerializer();
        this.loginRepository = new LoginRepository(dbConnection);
    }

    async findUserByAdmin(req: any, res: any, next: any) {
        const { username, password } = req.body;
        const useCase = new GetUserByAdmin(this.loginRepository);

        try {
            const result = await useCase.excute(username);
            // 入力したユーザ名に一致するユーザが存在しない場合
            if (!Object.keys(result).length) {
                const error = new Error(`The Username "${username}" was not found`);
                console.log(error);
                next(error);
            }

            // パスワードが一致しているかどうか
            const user = Object.values(result);
            if (password == user[0].password) {
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;
            }

            return this.loginSerializer.serialize(result);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async findUserByStaff(req: any, res: any) {
        const { username } = req.body;
        const useCase = new GetUserByStaff(this.loginRepository);
        const result = await useCase.excute(username);
        console.log(result);
        console.log(this.loginSerializer.serialize(result));
        return this.loginSerializer.serialize(result);
    }
}