/*main file ===starting up server admin module
Copyright (c) 2020 Feker Technologies Pvt Ltd
Developer Name:  */


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let fs = require('fs');
var http = require('http').Server(app);
const https = require('https');
var config = require("./config");
const logger = require("./logger");

//Added cors for cross origin resource sharing
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;
app.use(cors());
app.options('*', cors());

const routes = require("./routes/buzzboard");

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public",express.static(__dirname + "/public"));

var dbURL = config.databaseURL;
var dbName = config.dbName;
var database = config.database;

mongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, db) {
  if (err) {
    logger.error("ERROR IN CONNECTING TO DB:", err);
  } else {
    logger.info("Connected to DataBase");
	
    config.database = db.db(config.dbName);
	
  }
});

// To get version number.
app.get('/getVersionNumber', (req, res) => {
  res.send({version: config.version});
});

// Routes
app.use("/orders", routes);  

http.listen(config.port, () => logger.info(`App listening at ${config.port}`));
    