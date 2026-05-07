import { useState } from "react";
import api from "../../api/axios";

const UploadSection = ({ fetchDocuments }) => {

  const [uploads, setUploads] = useState([]);

  const handleFiles = async (e) => {

    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    
    const uploadItems = files.map((file) => ({
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    }));

    setUploads(uploadItems);

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {

      await api.post(
        "/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {

            const percent = Math.round(
              (progressEvent.loaded * 100) /
              progressEvent.total
            );

            setUploads((prev) =>
              prev.map((item) => ({
                ...item,
                progress: percent,
              }))
            );
          },
        }
      );

      
      setUploads((prev) =>
        prev.map((item) => ({
          ...item,
          progress: 100,
          status: "complete",
        }))
      );
      await fetchDocuments();

    } catch (error) {

      setUploads((prev) =>
        prev.map((item) => ({
          ...item,
          status: "failed",
        }))
      );

      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-2">
        Upload Documents
      </h2>

      <p className="text-slate-500 mb-6">
        Upload one or multiple PDF documents
      </p>

    
      <label
        className="
          border-2 border-dashed border-blue-300
          rounded-2xl
          p-10
          flex flex-col items-center justify-center
          cursor-pointer
          hover:bg-blue-50
          transition
        "
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          className="hidden"
          onChange={handleFiles}
        />

        <p className="text-lg font-medium text-slate-700">
          Click to upload PDFs
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Single or bulk upload supported
        </p>
      </label>

    
      <div className="mt-6 space-y-4">

        {uploads.map((upload, index) => (

          <div
            key={index}
            className="border border-slate-200 rounded-xl p-4"
          >

            <div className="flex items-center justify-between mb-2">

              <div>
                <p className="font-medium text-slate-700">
                  {upload.name}
                </p>

                <p className="text-sm text-slate-500">
                  {(upload.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <span
                className={`
                  text-sm font-medium
                  ${
                    upload.status === "complete"
                      ? "text-green-600"
                      : upload.status === "failed"
                      ? "text-red-600"
                      : "text-blue-600"
                  }
                `}
              >
                {upload.status}
              </span>

            </div>

            
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{
                  width: `${upload.progress}%`,
                }}
              />

            </div>

            <p className="text-right text-sm text-slate-500 mt-1">
              {upload.progress}%
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default UploadSection;