"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const loginRouter_1 = __importDefault(require("./logins/loginRouter"));
const app = (0, express_1.default)();
const port = 3001;
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
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
app.use('/api', loginRouter_1.default);
// app.use('/api', staffRouter, adminRouter, shiftStatusRouter, shiftRouter, completeShiftRouter, completeShiftLogRouter);
app.listen(port, () => {
    console.log(`listening port is ${port}`);
});
exports.default = app;
