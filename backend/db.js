const mongoose = require('mongoose');

const MongoURI = "mongodb://localhost:27017/?directConnection=true&readPreference=primary&tls=false&appname=MongoDB%20Compass"

const connectToMongo = () => {
    mongoose.connect(MongoURI,()=>{
        console.log('connected to database');
    })
}

module.exports = connectToMongo;