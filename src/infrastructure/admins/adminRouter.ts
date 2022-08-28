import express from 'express';
import { AdminController } from '../../interface/controller/AdminController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection();
const adminController = new AdminController(mysqlConnection);
const adminRouter = express.Router();

adminRouter.get('/admins', async (req: express.Request, res: express.Response) => {
    const results = await adminController.findAll(req, res);
    res.send(results);
});

adminRouter.get('/admins/:id', async (req: express.Request, res: express.Response) => {
    const result = await adminController.findAdmin(req, res);
    res.send(result);
});

adminRouter.post('/admins', async (req: express.Request, res: express.Response) => {
    const result = await adminController.createAdmin(req, res);
    res.send(result);
});

adminRouter.put('/admins/:id', async (req: express.Request, res: express.Response) => {
    const result = await adminController.updateAdmin(req, res);
    res.send(result);
});

adminRouter.delete('/admins/:id', async (req: express.Request, res: express.Response) => {
    const result = await adminController.deleteAdmin(req, res);
    res.send(result);
});

export default adminRouter;