"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logger = winston_1.createLogger({
    transports: [
        new winston_1.transports.Console()
    ]
});
