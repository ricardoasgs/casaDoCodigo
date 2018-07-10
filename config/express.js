var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var http = require("http");
var io = require("socket.io");
var errors = require("../middlewares/errors");


module.exports = function () {
    var app = express();

    require('dotenv').config();

    http = http.Server(app);
    io = io(http);

    app.use(express.static("./app/public"));
    app.set("view engine", "ejs");
    app.set("views", "./app/views");
    app.set("io", io);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load("routes", { cwd: "app" })
        .then("infra")
        .into(app);

    app.use(errors.error404());

    app.use(errors.error500());

    http.listen(process.env.PORT, function () {
        console.log("servidor rodando");
    });

    return app;
}
