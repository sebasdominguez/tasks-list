const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

connection();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", tasks);

app.listen(3000, () => console.log("Listening on port 3000"));
