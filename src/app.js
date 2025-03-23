const express = require("express");
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/conn");
const router = require("./router/router");
const { initializeSocket } = require("./socket");
var path = require("path");
const sessions = require("express-session");

const oneDay = process.env.oneDay || 1000 * 60 * 60 * 24;

const corsOptions = {
    origin: ["http://valetapp.wevalet.in", "http://localhost:5173", "https://valetapp.wevalet.in", "http://valetapp.wevalet.us", "https://valetapp.wevalet.us"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
};

const app = express();

// Set up express middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
}));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../..")));

// Set up static file serving for EJS
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

const privateKey = fs.readFileSync('../keys/private.key', 'utf8');
const certificate = fs.readFileSync('../keys/RootCA.cer', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTP server
const server = https.createServer(credentials, app);

// Initialize Socket.io after CORS setup
initializeSocket(server);

// Attach your routes
app.use("/", router);

// Listen on the specified port
const port = process.env.PORT || 3500;
server.listen(port, () => {
    console.log(`Server running at ${port}`);
});
