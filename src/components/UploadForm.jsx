import React, { useState } from "react";
import { FaIdCard } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";

const UploadForm = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    } else {
      setError("Please upload a valid image file.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
        <FaIdCard className="text-blue-600" /> Upload Driver's License
      </h2>

      <label className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 cursor-pointer text-blue-600 hover:bg-blue-50 transition w-full">
        <BiUpload className="text-xl" />
        <span>{selectedFile ? selectedFile.name : "Choose file"}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-md shadow-sm border"
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
