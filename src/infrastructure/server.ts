import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from './staffs/staffRouter';
import adminRouter from './admins/adminRouter';

const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/api', staffRouter, adminRouter);

app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
