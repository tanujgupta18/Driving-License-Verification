import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import extractTextFromImage from "./utils/extractTextFromImage";
import callGeminiTextAPI from "./api/geminiTextApi";
import ExtractedInfoCard from "./components/ExtractedInfoCard";
import { ImSpinner8 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";

function App() {
  const [ocrText, setOcrText] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    setOcrText("");
    setInfo(null);
    setShowRaw(false);

    try {
      const text = await extractTextFromImage(file);
      // console.log("OCR TEXT:", text);
      setOcrText(text);

      const parsed = await callGeminiTextAPI(text);
      // console.log("Parsed Info:", parsed);

      if (parsed?.error) {
        setError(parsed.error);
      } else {
        setInfo(parsed);
      }
    } catch (err) {
      console.error("Failed to process image:", err);
      setError("Something went wrong. Try another image.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <UploadForm onImageUpload={handleImageUpload} />

        {loading && (
          <div className="text-center text-gray-600 animate-pulse flex items-center justify-center gap-2">
            <ImSpinner8 className="animate-spin text-blue-500" />
            Processing image...
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-4 bg-red-100 text-red-700 border border-red-300 rounded shadow">
            <MdErrorOutline className="text-xl mt-1" />
            <span>{error}</span>
          </div>
        )}

        {/* {ocrText && (
          <div className="text-center">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
              {showRaw ? "Hide OCR Text" : "Show OCR Text"}
            </button>

            {showRaw && (
              <div className="mt-3 bg-white p-4 rounded shadow text-left text-sm whitespace-pre-wrap">
                <h3 className="font-bold text-gray-800 mb-2">Raw OCR Output</h3>
                <pre>{ocrText}</pre>
              </div>
            )}
          </div>
        )} */}

        {info && <ExtractedInfoCard info={info} />}
      </div>
    </div>
  );
}

export default App;
