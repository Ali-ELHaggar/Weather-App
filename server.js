// Setup empty JS object to act as endpoint for all routes
endPoint = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const cors = require("cors");
// Enable All CORS Requests
app.use(cors());


const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endPoint for all routes
endPoint = {};

// Setup Server
// Callback function to complete GET '/all'
const getAllData = function (request, response) {
    response.status(200).send(endPoint);
}
// GET Route
app.get("/all", getAllData);


// Callback function to complete POST '/add'
const pData = function (request, response) {
    endPoint = request.body;
    console.log(endPoint);
    response.status(200).send(endPoint);
}
// GET Route
app.post("/add", pData);

const portNum = 4000;
const hostnam = "127.0.0.1";

// function to test the server 
const listening = function () {
    console.log(`Server running at http://${hostnam}:${portNum}/`);
}
// spin up the server
app.listen(port, listening);
