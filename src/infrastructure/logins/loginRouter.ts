require('dotenv').config();
import express from 'express';
import { LoginController } from '../../interface/controller/LoginController';
import { MysqlConnection } from '../MysqlConnection';
import jwt from 'jsonwebtoken';
import { Admin } from '../../domain/Admin';

const mysqlConnection = new MysqlConnection();
const loginController = new LoginController(mysqlConnection);
const loginRouter = express.Router();
const jwt_env: string = 'my_secret';

loginRouter.post('/login/admins', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await loginController.findUserByAdmin(req, res, next);
    // 修正した方が良いかも（anyを減らす）
    const lists: any = result;
    const { id, password } = req.body;
    try {
        if (!lists.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        if (password != lists[0].password) {
            return res.status(400).json({ message: 'invalid password' });
        }
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
    // 修正した方が良いかも（anyを減らす）
    const lists: any = result;
    const { id, password } = req.body;
    try {
        if (!lists.length) {
            return res.status(400).json({ message: 'not found user' });
        }
        if (password != lists[0].password) {
            return res.status(400).json({ message: 'invalid password' });
        }
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