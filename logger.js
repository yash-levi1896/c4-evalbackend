const winston = require('winston');
require("dotenv").config()
require('winston-mongodb');

function logger(){
winston.add(new winston.transports.MongoDB({
    level:"error",
    db:process.env.MongoURL,
    collection:"logs",
    useUnifiedTopology: true 
}))
}

module.exports=logger;