const mongoose = require('mongoose');

const connectDB = async (MONGODB_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "restaurant"
        };

        await mongoose.connect(MONGODB_URL, DB_OPTIONS);
        console.log("Connected Successfully to MongoDB!!");
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;

