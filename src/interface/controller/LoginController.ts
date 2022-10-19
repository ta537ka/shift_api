require('dotenv').config();
import { GetUserByAdmin } from "../../usecase/logins/GetUserByAdmin";
import { GetUserByStaff } from "../../usecase/logins/GetUserByStaff";
import { IDBConnection } from "../database/IDBConnection";
import { LoginRepository } from "../database/LoginRepository";
import { LoginSerializer } from "../serializer/LoginSerializer";

import jwt from 'jsonwebtoken';

const bcrypt = require("bcryptjs");


export class LoginController {
    private loginSerializer: LoginSerializer;
    private loginRepository: LoginRepository;

    constructor(dbConnection: IDBConnection) {
        this.loginSerializer = new LoginSerializer();
        this.loginRepository = new LoginRepository(dbConnection);
    }

    async findUserByAdmin(req: any, res: any, next: any) {
        const { username } = req.body;

        try {
            const useCase = new GetUserByAdmin(this.loginRepository);
            const result = await useCase.excute(username);
            return this.loginSerializer.serialize(result);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async findUserByStaff(req: any, res: any) {
        const { username } = req.body;

        try {
            const useCase = new GetUserByStaff(this.loginRepository);
            const result = await useCase.excute(username);
            return this.loginSerializer.serialize(result);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}