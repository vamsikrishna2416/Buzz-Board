const { createLogger, transports, format } = require("winston");
require('winston-daily-rotate-file');

// const currentDate = new Date();
// let logFolder = "CronServices - " + currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();

// const logger = createLogger({
//   transports: [
//     new transports.File({
//       filename: `logs/${logFolder}.log`,
//       format: format.combine(format.timestamp(), format.json())
//     }),
//     new transports.Console({
//       format: format.combine(format.timestamp(), format.json())
//     }),
//   ],
// });

const logFormat = format.combine(
  format.label({label:"CRON-SERVICES"}),
  // format.colorize(),
  format.timestamp(),
  //  format.align(),
  format.json(),
	// format.printf(
	// 	info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`,
	// ),
);
const transport = new transports.DailyRotateFile({
  filename: `logs/BuzzBoard-%DATE%`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  // maxFiles: '1d',
  prepend: true,
	extension: ".log",
});

transport.on('rotate', function (oldFilename, newFilename) {
// call function like upload to s3 or on cloud
});

const logger = createLogger({
format: logFormat,
transports: [
		transport,
		new transports.Console(),
]});

module.exports = logger;
