const mongoose = require("mongoose");
const Course = require("./server/models/Course");
require("dotenv").config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Course.countDocuments();
    console.log("Total courses in DB:", count);
    process.exit(0);
}
run();
