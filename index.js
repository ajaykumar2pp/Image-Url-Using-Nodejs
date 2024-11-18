require('dotenv').config()
const express =require('express');
const path = require('path');
const bodyParser = require('body-parser')
const {connectMonggose} = require('./app/database/db')
const apiRoutes = require('./routes/api');
const app = express();


// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
// console.log(app.get("view engine"))

// ************************  Database Connection  **********************************//
connectMonggose();


global.appRoot = path.resolve(__dirname);

// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use("/uploads",express.static("uploads"))


// *************   Body parsing middleware  ************************//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// *********************************** API Routes ********************************//
apiRoutes(app);


// ************************* PORT ***********************************//
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`My server start on this port ${PORT}`)
})