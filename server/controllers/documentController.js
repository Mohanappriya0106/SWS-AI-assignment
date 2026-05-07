import Document from "../models/Document.js";
import path from "path";


export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    
    const documentsData = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      status: "complete",
    }));

  
    const savedDocuments = await Document.insertMany(
      documentsData
    );

    res.status(201).json({
      message: `${savedDocuments.length} file(s) uploaded successfully`,
      documents: savedDocuments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({
      createdAt: -1,
    });

    res.json(documents);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// @desc Download document
// @route GET /api/documents/download/:id
export const downloadDocument = async (req, res) => {

  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // absolute file path
   const filePath = path.join(
  process.cwd(),
  document.path
);

    // trigger download
    res.download(
      filePath,
      document.originalName
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};