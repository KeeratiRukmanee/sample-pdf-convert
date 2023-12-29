import winston from "winston"
import DailyRotateFile from 'winston-daily-rotate-file'
import { Service } from "typedi"

@Service()
export class LoggerService {

    private transport = new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '1d', // Keep logs for 14 days
    })

    private logger = winston.createLogger({
        levels: winston.config.npm.levels,
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            winston.format.json(),
            winston.format.metadata(),
            winston.format.prettyPrint(),
            winston.format.printf(data => `[${data.metadata?.timestamp}] ${data.level}: ${data.message} ${JSON.stringify(data.metadata)}`)
        ),
        transports: [
            this.transport
        ]
    })

    info(message: string, meta?: Record<string, any>) {
        this.logger.info({ message, ...meta }) // ... Spread Operator (Copy from )
    }

    warn(message: string, meta?: Record<string, any>) {
        this.logger.warn({ message, ...meta })
    }

    error(message: string, meta?: Record<string, any>) {
        this.logger.error({ message, ...meta })
    }
}
