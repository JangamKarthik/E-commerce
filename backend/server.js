const app = require("./app");

const dotenv = require("dotenv");

const connectDB = require("./database")


// Handling  uncaught exceptions and rejections.

process.on("uncaughtException",(err)=>{
    console.log(`Uncaught Exception : ${err}`);
    console.log('server shutting down due to Unhandled Promise  Rejection');
    process.exit(1);
});

dotenv.config({path:"backend/config/config.env"});



app.listen(3000,()=>{

    console.log('Server is running on http://localhost:3000');
})

//connecting to the database

//connectDB();

//unhandled promise rejection
process.on('unhandledRejection', err=>{
    
    console.log(`Error : ${err.message}`);
    console.log('shutting down server due to DB errors');

    server.close(()=>{
        process.exit(1);
    });

});