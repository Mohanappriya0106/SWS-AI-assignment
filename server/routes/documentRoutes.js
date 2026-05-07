import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadDocuments,
  getDocuments,
} from "../controllers/documentController.js";

const router = express.Router();


// upload route
router.post("/upload", (req, res) => {

  upload.array("documents")(req, res, async (err) => {

    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    await uploadDocuments(req, res);
  });

});


// get all documents
router.get("/", getDocuments);

export default router;