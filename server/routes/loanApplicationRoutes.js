const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const loanApplicationController = require("../controllers/loanApplicationController");

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Route
router.post(
  "/apply",
  upload.fields([
    { name: "bankStatementFile", maxCount: 1 },
    { name: "otherTransactionFile", maxCount: 1 },
  ]),
  loanApplicationController.createLoanApplication
);

module.exports = router;
