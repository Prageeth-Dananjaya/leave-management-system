const jwt = require("jsonwebtoken");
const SECRET = "dev_secret";

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });
  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next;
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { authenticate, authorizeRole };
