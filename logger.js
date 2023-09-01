const appRoot = require("app-root-path");
const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

require("winston-mongodb");

// define the custom settings for each transport (file, console)
const options = {
  users: {
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      })
    ),
    filename: `${appRoot}/logs/users.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 25,
    colorize: false,
  },
  transactions: {
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      })
    ),
    filename: `${appRoot}/logs/transactions.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 25,
    colorize: false,
  },
  mongodb: {
    level: "verbose",
    db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_COLLECTION}.pazwr.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collection: "server_err_logs",
    format: winston.format.combine(
      winston.format.timestamp(),

      // Convert logs to a json format
      winston.format.json()
    ),
  },
  mongodbUsers: {
    level: "info",
    db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_COLLECTION}.pazwr.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collection: "users_logs",
    format: winston.format.combine(
      winston.format.timestamp(),

      // Convert logs to a json format
      winston.format.json()
    ),
  },
  mongodbTrans: {
    level: "info",
    db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_COLLECTION}.pazwr.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collection: "transactions_logs",
    format: winston.format.combine(
      winston.format.timestamp(),

      // Convert logs to a json format
      winston.format.json()
    ),
  },
  file: {
    level: "verbose",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 25,
    colorize: false,
  },
  errFile: {
    level: "warn",
    filename: `${appRoot}/logs/err.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 25,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: [
    new winston.transports.MongoDB(options.mongodb),
    new winston.transports.File(options.file),
    new winston.transports.File(options.errFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const usersLogger = winston.createLogger({
  transports: [
    new winston.transports.File(options.users),
    new winston.transports.MongoDB(options.mongodbUsers),
  ],
  exitOnError: false,
});
const transactionsLogger = winston.createLogger({
  transports: [
    new winston.transports.File(options.transactions),
    new winston.transports.MongoDB(options.mongodbTrans),
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.verbose(message);
  },
};

module.exports = { logger, usersLogger, transactionsLogger };
