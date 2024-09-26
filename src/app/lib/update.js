const mongoose = require('mongoose');
require('dotenv').config();

const Player = require('./schema/playerSchema');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    }
    connectDB();