const app = require("./app");

const dotenv = require("dotenv");

const connectDB = require("./database")

dotenv.config({path:"backend/config/config.env"});

//connecting to the database
try{
    connectDB()
    console.log("sex with ashrut")
}
catch{
    console.log("sex with karthik")
}


app.listen(3000,()=>{

    console.log('Server is running on http://localhost:${process.env.PORT}');
})