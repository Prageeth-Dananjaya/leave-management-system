const express = require("express");
const router = express.Router();
const { users } = require("../store");
const jwt = require("jsonwebtoken");

const SECRET = "dev_secret";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid Credentials" });
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, name: user.name },
    SECRET,
    { expiresIn: "8h" }
  );
  res.json({
    token,
    user: { username: user.username, role: user.role, name: user.name },
  });
});

module.exports = router;
