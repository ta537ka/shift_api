require('dotenv').config();
import express from 'express';
import { LoginController } from '../../interface/controller/LoginController';
import { MysqlConnection } from '../MysqlConnection';
import jwt from 'jsonwebtoken';

const mysqlConnection = new MysqlConnection();
const loginController = new LoginController(mysqlConnection);
const loginRouter = express.Router();
const jwt_env: string = 'my_secret';
const expire_time: string = '1h';

loginRouter.post('/login/admins', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await loginController.findUserByAdmin(req, res, next);
    try {
        if (!result.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        const id: number = result[0].id
        const username: string = result[0].username;

        // tokenの発行(シークレットは環境変数から呼び出す)
        const token = jwt.sign({ id, username }, jwt_env, { expiresIn: expire_time });
        res.status(200).json({
            id: id,
            username: username,
            token: token
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

loginRouter.post('/login/staffs', async (req: express.Request, res: express.Response) => {
    const result = await loginController.findUserByStaff(req, res);

    try {
        if (!result.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        const id: number = result[0].id;
        const username: string = result[0].username;

        // tokenの発行(シークレットは環境変数から呼び出す)
        const token = jwt.sign({ id, username }, jwt_env, { expiresIn: expire_time });
        res.status(200).json({
            id: id,
            username: username,
            token: token
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    res.send(result);
});

export default loginRouter;