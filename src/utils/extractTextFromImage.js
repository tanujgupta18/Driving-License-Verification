import Tesseract from "tesseract.js";

const extractTextFromImage = async (file) => {
  const result = await Tesseract.recognize(file, "eng");
  return result.data.text;
};

export default extractTextFromImage;
