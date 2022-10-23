require('dotenv').config();
import express from 'express';
import { LoginController } from '../../interface/controller/LoginController';
import { MysqlConnection } from '../MysqlConnection';
import jwt from 'jsonwebtoken';

const mysqlConnection = new MysqlConnection();
const loginController = new LoginController(mysqlConnection);
const loginRouter = express.Router();
const jwt_env: string = 'my_secret';

loginRouter.post('/login/admins', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await loginController.findUserByAdmin(req, res, next);

    try {
        if (!result.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        // 修正した方が良いかも（anyを減らす）
        const id: number = result[0].id

        // tokenの発行(シークレットは環境変数から呼び出す)
        const token = jwt.sign({ id }, jwt_env);
        res.status(200).json({
            id: id,
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

        // 修正した方が良いかも（anyを減らす）
        const id: number = result[0].id;

        // tokenの発行(シークレットは環境変数から呼び出す)
        const token = jwt.sign({ id }, jwt_env);
        res.status(200).json({
            id: id,
            token: token
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    res.send(result);
});

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == undefined) {
        return res.status(400).json({ error: "header error" });
    }
    try {
        const token = jwt.verify(authHeader, jwt_env);
        console.log(token);
        next();
    } catch (error) {
        res.status(400).json(error);
    }
};

loginRouter.get('/auth', verifyToken, (req: express.Request, res: express.Response) => {
    res.status(200).send("ログイン認証完了")
});

export default loginRouter;