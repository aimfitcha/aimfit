import mongoose from "mongoose";

const connection  = {}
async function dbConnect() {
    if (connection.isConnected){
        console.log("Already Database Connected");
        return
    }
    try {
        const db = await mongoose.connect('mongodb+srv://dibya98:9v0HcTuqtwZlSQ9i@cluster0.zjwpx5s.mongodb.net/aimfit');
        console.log(process.env.DATABASE_URL);
        
        connection.isConnected = db.connections[0].readyState;
        console.log("Db Connected Successfully");
        
    } catch (error) {
        console.log("Database Connection Falied");
        
        console.log(error);
        
    }
}

export default dbConnect
