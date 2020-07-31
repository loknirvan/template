import express = require('express')
import {IncomingMessage, ServerResponse} from 'http'
import { Logger, createLogger, format, transports } from 'winston'

const logger:Logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [
        new transports.File({
          filename: './logs/all-logs.log',
          maxsize: 5242880,
          maxFiles: 5,
        }),
        new transports.Console(),
      ]
});

const app = express();
app.use((request: IncomingMessage, response: ServerResponse, next:any) => {
    logger.info(`Request received, url=${request.url}`);
    next();
    logger.info(`Request completed, url=${request.url}`);
});

const syncSummaryRouter:express.Router = express.Router();
syncSummaryRouter.get('/:summary_id', (request: any, response: ServerResponse)=>{
    logger.info(`Retriving sync summary, summary_id=${request.params.summary_id}`)
    response.writeHead(200,{});
    response.end('Hello Lokesh Nirvan');
})

app.get('/ping', (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(200, {
        'Content-Type': 'application/text'
    });
    response.end('pong');
}).use('/summary/', syncSummaryRouter).listen(3000, ()=>{
    logger.info('Server is listening on port 3000')
});