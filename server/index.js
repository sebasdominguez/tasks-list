const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");

const app = express();

connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", tasks);

app.listen(8080, () => console.log("Listening on port 8080"));
