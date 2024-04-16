import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection : connectionObject ={};

async function dbConnect():Promise<void> {

    if (connection.isConnected) {
        console.log("Database already connected");  
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '' , {})

        connection.isConnected = db.connections[0].readyState
        console.log("Databse connected successfully");

        console.log("database", db)
        console.log("database connection", db.connection)
        
    } catch (error) {

        console.log("Falied to connect database", error);
        
        process.exit(1)
        
    }
    
}
export {dbConnect}