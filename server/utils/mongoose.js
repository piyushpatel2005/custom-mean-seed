const mongoose = require('mongoose');
const config = require('../config/development');

function initializeMongoose(app, success) {
    mongoose.connect(config.mongodb.url);

    mongoose.connection.on("open", function () {
        console.log("Mongoose connected.");
        success();
    });

    mongoose.connection.on("error", () => {
        console.log("Mongoose connection failed.");
        cleanup();
    })

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if(app) {
        app.set('mongoose', mongoose);
    }
    return mongoose;
};

function cleanup() {
    mongoose.connection.close(function() {
        console.log("Closing DB connections and stopping the app! Bye!");
        process.exit(0);
    })
}

module.exports.initializeMongoose = initializeMongoose;