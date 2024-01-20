import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let userIsRegistered = false;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

function userCheck(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];
  if (username === "junanthony25" && password === "IloveProgramming") {
    userIsRegistered = true;
  }
  next();
}

app.use(userCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/home", (req, res) => {
  const username = req.body["username"];
  if (userIsRegistered) {
    res.render("index", {
      user: username,
    });
  } else {
    res.redirect("/");
  }
});

app.listen(port, (req, res) => {
  console.log(`Running on port ${port}.`);
});
