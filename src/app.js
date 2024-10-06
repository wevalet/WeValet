// app.js
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/conn");
const router = require("./router/router");
const { initializeSocket } = require("./socket"); 
var path = require("path");
const sessions = require("express-session");

const corsOptions = {
    origin: "http://valetapp.wevalet.in/", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Enable credentials (cookies, authorization headers)
    optionsSuccessStatus: 200, // Response status for successful preflight requests
  };

// Set up express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.static(path.join(__dirname, "../..")));
// app.use(express.static(path.join(__dirname, "..")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// Attach your routes
app.use("/", router);

// Listen on the specified port
const port = process.env.PORT || 3500;
server.listen(port, () => {
    console.log(`Server running at ` + port);
});
