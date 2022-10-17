import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from './staffs/staffRouter';
import adminRouter from './admins/adminRouter';
import shiftStatusRouter from './shift_statuses/shiftStatusRouter';
import shiftRouter from './shifts/shiftRouter';
import completeShiftRouter from './complete_shifts/completeShiftRouter';
import completeShiftLogRouter from './complete_shift_logs/completeShiftLogRouter';
import loginRouter from './logins/loginRouter';



const app = express();
const port = 3001;
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

//クロスサイト対応。swagger-uiから見た際、クロスサイトのエラーがでることへの対応。
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var options = {
    explorer: true,
    swaggerOptions: {
        url: 'http://localhost:3001/api-docs',
    },
    swaggerDefinition: {
        info: {
            title: 'Hello World',
            version: '1.0.0'
        },
    },
    apis: ['./server.ts'],
};
var swaggerSpec = swaggerJSDoc(options);

const swaggerDocument = require('./shift_api.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api', loginRouter);
app.use('/api', staffRouter, adminRouter, shiftStatusRouter, shiftRouter, completeShiftRouter, completeShiftLogRouter);

app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
