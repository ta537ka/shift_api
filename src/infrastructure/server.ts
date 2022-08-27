import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from './staffs/staffRouter';

const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/api', staffRouter);

app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
