import express from 'express';
import { ShiftController } from '../../interface/controller/ShiftController';
import { MysqlConnection } from '../MysqlConnection';

const mysqlConnection = new MysqlConnection;
const shiftController = new ShiftController(mysqlConnection);
const shiftRouter = express.Router();

//admin
shiftRouter.get('/admin/shifts', async (req: express.Request, res: express.Response) => {
    const results = await shiftController.findAll(req, res);
    res.send(results);
});


//staff
shiftRouter.get('/shifts/:staff_id', async (req: express.Request, res: express.Response) => {
    const results = await shiftController.findShiftByUser(req, res);
    res.send(results);
});

shiftRouter.get('/staff/shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await shiftController.findShift(req, res);
    res.send(result);
});

shiftRouter.post('/staff/shifts', async (req: express.Request, res: express.Response) => {
    const result = await shiftController.createShift(req, res);
    res.send(result);
});

shiftRouter.put('/staff/shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await shiftController.updateShift(req, res);
    res.send(result);
});

shiftRouter.delete('/staff/shifts/:id', async (req: express.Request, res: express.Response) => {
    const result = await shiftController.deleteShift(req, res);
    res.send(result);
});

export default shiftRouter;