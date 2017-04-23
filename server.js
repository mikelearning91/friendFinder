// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var formidable = require('formidable');
var fs = require('fs');
var favicon = require('express-favicon');
var htmlRoutes = require('./routing/html-routes.js');
var apiRoutes = require('./routing/api-routes.js');
var fileRoutes = require('./routing/file-routes.js');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Serves favicon.ico
// =============================================================
app.use(favicon(__dirname + '/public/favicon.ico'));

// Serves static paths
// =============================================================
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads')));

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

fileRoutes(app);
apiRoutes(app);
htmlRoutes(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});