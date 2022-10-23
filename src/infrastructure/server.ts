import express from 'express';
import bodyParser from 'body-parser';
import staffRouter from './staffs/staffRouter';
import adminRouter from './admins/adminRouter';
import shiftStatusRouter from './shift_statuses/shiftStatusRouter';
import shiftRouter from './shifts/shiftRouter';
import completeShiftRouter from './complete_shifts/completeShiftRouter';
import completeShiftLogRouter from './complete_shift_logs/completeShiftLogRouter';
import loginRouter from './logins/loginRouter';
import jwt from 'jsonwebtoken';


const app = express();
const port = process.env.PORT;
const cors = require('cors');
const jwt_env: string = 'my_secret';

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

// swagger settings
const options = {
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
const swaggerSpec = swaggerJSDoc(options);
const swaggerDocument = require('./shift_api.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// authorization settings
const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == undefined) {
        return res.status(400).json({ error: "header error" });
    }
    try {
        // 修正する
        const token = jwt.verify(authHeader, jwt_env);
        next();
    } catch (error) {
        res.status(400).json(error);
    }
};

app.use('/api', loginRouter);
app.use('/api', verifyToken, staffRouter, adminRouter, shiftStatusRouter, shiftRouter, completeShiftRouter, completeShiftLogRouter);

app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
