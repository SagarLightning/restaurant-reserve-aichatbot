import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("Connection Secured");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/menu`)
}

export default connectDB