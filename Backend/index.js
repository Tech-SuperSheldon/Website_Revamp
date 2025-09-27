const express = require("express") ;
const app = express() ;
require("dotenv").config() ;

const main = require("./src/config/db") ;
const cors = require("cors") ;
const userRouter = require("./src/routes/userRouter") ;

app.use(cors({
    origin: "https://supersheldon.com",
    credentials: true
}))

app.use(express.json()) ;

// Book Demo 
app.use("/user" , userRouter) ;

// parallely calling two function to connent DB and redis both at the same time
const initializeConnection = async ()=>{

    try{
        await main() ;
        console.log("DB Connected") ;
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    }
    catch(err)
    {
        console.log("Error : " + err) ;
    }
}

initializeConnection() ;