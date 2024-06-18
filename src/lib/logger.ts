// logger.ts
import winston from 'winston';
import { MongoDB } from 'winston-mongodb';

const logger = winston.createLogger({
  level: 'info', // Set your desired log level (e.g., 'info', 'debug', etc.)
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log entry
    winston.format.json()
  ),
  defaultMeta: {
    owner: 'default-owner', // Set your default owner value here
  },
  transports: [
    new winston.transports.Console(), // Log to console (optional)
    // new MongoDB({
    //   db:process.env.MONGODB_URI!, // MongoDB connection URL
    //   collection: 'logs', // Collection name
    //   dbName:"nextAuth",
    //   options: { useUnifiedTopology: true }, // MongoDB options
    // }),
    new winston.transports.File({ filename: 'combined.log' }), // Log to file
  ],
});

export { logger };
