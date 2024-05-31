const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});
 
// const PORT = process.env.PORT || 8080;
 
app.listen(port, console.log(`Server started on port ${port}`));
