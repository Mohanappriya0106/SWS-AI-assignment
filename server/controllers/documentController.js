import Document from "../models/Document.js";


// @desc Upload documents
// @route POST /api/documents/upload
export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    // prepare documents for database
    const documentsData = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      status: "complete",
    }));

    // save to mongodb
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


// @desc Get all documents
// @route GET /api/documents
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