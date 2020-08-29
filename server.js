var express = require("express");
var passport = require("./config/passport");
var db = require("./models")

var PORT = process.env.PORT || 8000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = require("./config/config.json")
var routes = require("./controllers/controller.js");
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


app.use(routes);

app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});
