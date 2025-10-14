const express = require("express");
const router = express.Router();
const { leavesList } = require("../store");
const { v4: uuidv4 } = require("uuid");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

function overlaps(a1, a2, b1, b2) {
  return a1 <= b2 && b1 <= a2;
}

router.post("/", authenticate, (req, res) => {
  const { fromDate, toDate, reason } = req.body;
  const employeeName = req.user.name;

  if (!fromDate || !toDate || !reason)
    return res.status(400).json({ message: "Missing fields" });
  if (new Date(fromDate) > new Date(toDate))
    return res.status(400).json({ message: "Invalid date range" });
  const hasConflict = leavesList.some(
    (l) =>
      l.employeeName === employeeName &&
      l.status === "Approved" &&
      overlaps(
        new Date(l.fromDate),
        new Date(l.toDate),
        new Date(fromDate),
        new Date(toDate)
      )
  );
  if (hasConflict)
    return res.status(400).json({ message: "Conflicts with approved leave" });

  const newLeave = {
    id: uuidv4(),
    employeeName,
    fromDate,
    toDate,
    reason,
    status: "Pending",
  };
  leavesList.push(newLeave);
  res.status(201).json(newLeave);
});

router.get("/", authenticate, authorizeRole("admin"), (req, res) => {
  const { employee } = req.query;
  if (employee) {
    const filtered = leavesList.filter((l) => l.employeeName === employee);
    return res.json(filtered);
  }
  res.status(200).json(leavesList);
});

router.get("/:id", authenticate, (req, res) => {
  const leave = leavesList.find((l) => l.id === req.params.id);
  if (!leave) return res.status(404).json({ message: "Leave not found" });
  if (req.user.role !== "admin" && leave.employeeName !== req.user.name) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.status(200).json(leave);
});

router.put(
  "/:id",
  authenticate,
  (req, res, next) => {
    if (req.user.role === "admin") return next();
    const leave = leavesList.find((l) => l.id === req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.employeeName !== req.user.name) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Cannot modify processed leave" });
    }

    const { fromDate, toDate, reason } = req.body;
    if (fromDate && new Date(fromDate) > new Date(toDate))
      return res.status(400).json({ message: "Invalid date range" });

    if (fromDate) leave.fromDate = fromDate;
    if (toDate) leave.toDate = toDate;
    if (reason) leave.reason = reason;
    res.json(leave);
  },
  authorizeRole("admin"),
  (req, res) => {
    const leave = leavesList.find((l) => l.id === req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    const { status } = req.body;
    if (status && !["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    leave.status = status;
    res.json(leave);
  }
);

router.delete(
  "/:id",
  authenticate,
  (req, res, next) => {
    if (req.user.role === "admin") return next();

    const index = leavesList.findIndex((l) => l.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Leave not found" });

    const leave = leavesList[index];
    if (leave.employeeName !== req.user.name) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Cannot delete processed leave" });
    }

    leavesList.splice(index, 1);
    return res.json({ message: "Leave cancelled" });
  },
  authorizeRole("admin"),
  (req, res) => {
    const index = leavesList.findIndex((l) => l.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Leave not found" });
    leavesList.splice(index, 1);
    res.json({ message: "Leave deleted by admin" });
  }
);

module.exports = router;
