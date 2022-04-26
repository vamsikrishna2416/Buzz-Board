/*configuration ===configuration of database and env 
Developer Name:  R Vamsi krishna*/

let config = {};

config.version = "1.0.1";

// config.env = process.env.envVariable;//dev,qa,prod
config.env = "dev";//dev,qa,prod

config.baseURL = "";

// config.port = process.env.companyBackEndPort;
config.port = 5005;

config.dbName = "buzzBoard";
// config.dbName = process.env.databaseName;
config.database = "";
config.db1 = "";

if (config.env == "dev") {
   
    config.databaseURL = "mongodb+srv://vamsikrishna:vamsikrishna2416@cluster0.9xrda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    config.baseURL="http://localhost:5005/";
	
} 

module.exports = config;