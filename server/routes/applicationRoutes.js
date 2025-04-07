const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const studentAuth = require("../middleware/studentAuth");

router.post(
  "/:placementId",
  studentAuth,
  applicationController.applyForPlacement
);

module.exports = router;
