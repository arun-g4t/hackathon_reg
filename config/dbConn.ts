import mongoose, { Mongoose } from "mongoose";
import { variables } from "./envLoader";

class Database{
    static instance : Mongoose
    static async createConnection(){
        const { DB_HOST, DB_NAME, DB_PORT } = variables;

        const dbConnURL = `mongodb://${DB_HOST}:${DB_PORT}`;

        const dbName = DB_NAME as string;
        try {
            const connectionInstance = await mongoose.connect(dbConnURL, {
              autoIndex: true,
              dbName,
            });
            console.log("connected to db");
      
            Database.instance = connectionInstance;
          } catch (error) {
            console.error(error);
            console.error(`Error connecting to db`);
          }
    }
}
export default Database;