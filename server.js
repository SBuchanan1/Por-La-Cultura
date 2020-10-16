const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(handlebars),
        helpers: {
            ifEquals: function (a, b, opts) {
                return a == b ? opts.fn(this) : opts.inverse(this);
            },
        },
    })
);
app.set("view engine", "handlebars");