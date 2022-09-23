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

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const yaml = require('yaml-js');
// const yamlfile = require('./shift_api.yaml')

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

// const swaggerDocument = YAML.load('./shift_api.yaml');
// const swaggerDocument = yaml.load('./shift_api.yaml');
// const swaggerDocument = yaml.load(yamlfile);
// const swaggerDocument = YAML.load(yamlfile);
const swaggerDocument = require('./shift_api.json');
// console.log(swaggerDocument);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/**
 * @swagger
 * /api/staffs:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

app.use('/api', staffRouter, adminRouter, shiftStatusRouter, shiftRouter, completeShiftRouter, completeShiftLogRouter);


app.listen(port, () => {
    console.log(`listening port is ${port}`);
})

export default app
