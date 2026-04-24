const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
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

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io after CORS setup
initializeSocket(server);

// Structured production-style request logger
morgan.token("body", (req) => {
    if (req.method === "POST" || req.method === "PUT") {
        const sanitized = { ...req.body };
        if (sanitized.password) sanitized.password = "***";
        return JSON.stringify(sanitized);
    }
    return "-";
});

morgan.token("colored-status", (req, res) => {
    const status = res.statusCode;
    if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // red
    if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // yellow
    if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // cyan
    return `\x1b[32m${status}\x1b[0m`;                    // green
});

const logFormat =
    "[:date[iso]] :method :url | status::colored-status | :response-time ms | ip::remote-addr | body::body";

app.use(morgan(logFormat));

// Attach your routes
app.use("/", router);

// Listen on the specified port
const port = process.env.PORT || 3500;
server.listen(port, () => {
    console.log(`Server running at ${port}`);
});
