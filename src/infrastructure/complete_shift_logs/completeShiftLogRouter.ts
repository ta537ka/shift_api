import express from 'express';
import { CompleteShiftLogController } from '../../interface/controller/CompleteShiftLogController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection();
const completeShiftLogController = new CompleteShiftLogController(mysqlConnection);
const completeShiftLogRouter = express.Router();

//admin and staff
completeShiftLogRouter.get('/complete_shift_logs', async (req: express.Request, res: express.Response) => {
    const results = await completeShiftLogController.findAll(req,res);
    res.send(results);
});

completeShiftLogRouter.get('/complete_shift_logs/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftLogController.findCompleteShiftLog(req,res);
    res.send(result);
});


//admin
completeShiftLogRouter.post('/complete_shift_logs', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftLogController.createCompleteShiftLog(req,res);
    res.send(result);
});

completeShiftLogRouter.put('/copmlete_shift_logs/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftLogController.updateCompleteShiftLog(req,res);
    res.send(result);
});

completeShiftLogRouter.delete('/complete_shift_logs/:id', async (req: express.Request, res: express.Response) => {
    const result = await completeShiftLogController.DeleteCompleteShiftLog(req,res);
    res.send(result);
});

export default completeShiftLogRouter;