

function cleanup() {
    mongoose.connection.close(function() {
        console.log("Closing DB connections and stopping the app! Bye!");
        process.exit(0);
    })
}

module.exports.cleanup = cleanup;