"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var winston_1 = require("winston");
var logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.format.printf(function (info) { return info.timestamp + " " + info.level + ": " + info.message; })),
    transports: [
        new winston_1.transports.File({
            filename: './logs/all-logs.log',
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston_1.transports.Console(),
    ]
});
var app = express();
app.use(function (request, response, next) {
    logger.info("Request received, url=" + request.url);
    next();
    logger.info("Request completed, url=" + request.url);
});
var syncSummaryRouter = express.Router();
syncSummaryRouter.get('/:summary_id', function (request, response) {
    logger.info(typeof request);
    logger.info("Retriving sync summary, summary_id=" + request.params.summary_id);
    response.writeHead(204, {});
    response.end();
});
app.get('/ping', function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/text'
    });
    response.end('pong');
}).use('/summary/', syncSummaryRouter).listen(3000, function () {
    logger.info('Server is listening on port 3000');
});
