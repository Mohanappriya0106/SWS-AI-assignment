import express from "express";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("documents"),
  (req, res) => {
    res.json({
      message: "Files uploaded successfully",
      files: req.files,
    });
  }
);

export default router;