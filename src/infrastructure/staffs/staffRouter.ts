import express from 'express';
import { StaffController } from '../../interface/controller/StaffController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection();
const staffController = new StaffController(mysqlConnection);
const staffRouter = express.Router();

staffRouter.get('/staffs/:id', async (req: express.Request, res: express.Response) => {
    const result = await staffController.findStaff(req, res);
    res.send(result);
});

staffRouter.get('/staffs', async (req: express.Request, res: express.Response) => {
    const results = await staffController.findAll(req, res);
    res.send(results);
});

staffRouter.post('/staffs', async (req: express.Request, res: express.Response) => {
    const result = await staffController.createStaff(req, res);
    res.send(result);
});

staffRouter.put('/staffs/:id', async (req: express.Request, res: express.Response) => {
    const result = await staffController.updateStaff(req, res);
    res.send(result);
});

staffRouter.delete('/staffs/:id', async (req: express.Request, res: express.Response) => {
    const result = await staffController.deleteStaff(req, res);
    res.send(result);
});

export default staffRouter;