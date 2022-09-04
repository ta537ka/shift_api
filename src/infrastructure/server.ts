import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from './staffs/staffRouter';
import adminRouter from './admins/adminRouter';
import shiftStatusRouter from './shift_statuses/shiftStatusRouter';
import shiftRouter from './shifts/shiftRouter';
import completeShiftRouter from './complete_shifts/completeShiftRouter';
import completeShiftLogRouter from './complete_shift_logs/completeShiftLogRouter';

const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/api', staffRouter, adminRouter, shiftStatusRouter, shiftRouter, completeShiftRouter, completeShiftLogRouter);

app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
