import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
// import { ATLAS_URI } from "../config/config.js";
import ENV  from "../config/config.js";
// const url = "mongodb+srv://AmanAgrawal:Elective%40123@elective.cph0axl.mongodb.net/?retryWrites=true&w=majority";

async function connect(){

    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(url);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected")
    return db;
}

export default connect;