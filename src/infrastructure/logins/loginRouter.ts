import express from 'express';
import { LoginController } from '../../interface/controller/LoginController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection();
const loginController = new LoginController(mysqlConnection);
const loginRouter = express.Router();

loginRouter.post('/login/admins', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await loginController.findUserByAdmin(req, res, next);
    res.send(result);
});

loginRouter.post('/login/staffs', async (req: express.Request, res: express.Response) => {
    const result = await loginController.findUserByStaff(req, res);
    res.send(result);
});


export default loginRouter;