import express from 'express';
import { CompleteShiftController } from '../../interface/controller/CompleteShiftController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection();
const completeShiftController = new CompleteShiftController(mysqlConnection);
const completeShiftRouter = express.Router();

//admin
completeShiftRouter.post('/complete_shifts', async (req: express.Request, res: express.Response) => {
    const results = await completeShiftController.findAllByAdmin(req, res);
    res.send(results);
});

completeShiftRouter.get('/admin/complete_shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftController.findCompleteShift(req, res);
    res.send(result);
});

completeShiftRouter.post('/admin/complete_shifts', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftController.createCompleteShift(req, res);
    res.send(result);
});

completeShiftRouter.put('/admin/complete_shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftController.updateCompleteShit(req, res);
    res.send(result);
});

completeShiftRouter.delete('/admin/complete_shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftController.deleteCompleteShift(req, res);
    res.send(result);
});

//staff
completeShiftRouter.post('/staff/complete_shifts', async (req: express.Request, res: express.Response) => {
    const results = await completeShiftController.findAllByStaff(req, res);
    res.send(results);
});

export default completeShiftRouter;