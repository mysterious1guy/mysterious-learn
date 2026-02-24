const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const testConn = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('SUCCESS: Connected to MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('FAILURE: Could not connect', err.message);
        process.exit(1);
    }
};

testConn();
