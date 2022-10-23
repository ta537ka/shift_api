"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const staffRouter_1 = __importDefault(require("./staffs/staffRouter"));
const adminRouter_1 = __importDefault(require("./admins/adminRouter"));
const shiftStatusRouter_1 = __importDefault(require("./shift_statuses/shiftStatusRouter"));
const shiftRouter_1 = __importDefault(require("./shifts/shiftRouter"));
const completeShiftRouter_1 = __importDefault(require("./complete_shifts/completeShiftRouter"));
const completeShiftLogRouter_1 = __importDefault(require("./complete_shift_logs/completeShiftLogRouter"));
const loginRouter_1 = __importDefault(require("./logins/loginRouter"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const cors = require('cors');
const jwt_env = 'my_secret';
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
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == undefined) {
        return res.status(400).json({ error: "header error" });
    }
    try {
        const token = jsonwebtoken_1.default.verify(authHeader, jwt_env);
        console.log(token);
        // if (token != authHeader) {
        //     return res.status(400).json({ error: "not match token" });
        // }
        next();
    }
    catch (error) {
        res.status(400).json(error);
    }
};
app.get('/sample', verifyToken, (req, res) => {
    res.send("Success");
});
app.use('/api', loginRouter_1.default);
app.use('/api', verifyToken, staffRouter_1.default, adminRouter_1.default, shiftStatusRouter_1.default, shiftRouter_1.default, completeShiftRouter_1.default, completeShiftLogRouter_1.default);
app.listen(port, () => {
    console.log(`listening port is ${port}`);
});
exports.default = app;
