const mongoose = require('mongoose');

require('dotenv').config();

const initilaizeDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        if(connection){
            console.log("MongoDB connected!!")
        }
    } catch (error) {
        console.log("Database Connection Failed", error);
    }
}

module.exports = {initilaizeDatabase};