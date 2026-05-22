const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "postgres"
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
  res.send("User added");
});

app.listen(8080, () => {
  console.log("Server running");
});