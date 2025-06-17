const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizeRole,
} = require("../middlewares/authMiddleware");
const {
  applyLeave,
  getMyLeaveRequest,
  viewAllLeaveRequest,
  updateLeaveStatus,
} = require("../controllers/leaveController");

//..........Route For Users............
router.post("/apply-leave", authMiddleware, authorizeRole("user"), applyLeave);
router.get(
  "/my-leave-request",
  authMiddleware,
  authorizeRole("user"),
  getMyLeaveRequest
);

//...........Routes For Admin..........
router.get(
  "/leave-requests",
  authMiddleware,
  authorizeRole("admin"),
  viewAllLeaveRequest
);
router.put(
  "/leave-status/:id",
  authMiddleware,
  authorizeRole("admin"),
  updateLeaveStatus
);

module.exports = router;
