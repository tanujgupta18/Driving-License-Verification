const API_KEY = "AIzaSyDJjiTVVdhmepZ3hdDvmXnG9Sgqxp_ZWf8";

const callGeminiTextAPI = async (ocrText) => {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const prompt = `
You are a JSON API.

Return only valid JSON (no markdown, no explanation, no comments). The JSON must have the following format:

{
  "full_name": "string",
  "dob": "string",
  "license_number": "string",
  "expiry_date": "string",
  "address": "string",
  "issuing_authority": "string"
}

If a value is missing, use "N/A".

Now, extract the data from this OCR text:
"""
${ocrText}
"""

Important:
- DO NOT wrap the JSON in triple backticks
- DO NOT use markdown formatting
- Only return raw, clean JSON
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 503) {
      return {
        error: "Please try again in a few minutes.",
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      return {
        error: `Gemini API failed with status ${response.status}`,
        raw: errorText,
      };
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    // console.log("Gemini raw output:", text);

    if (!text) {
      return { error: "Empty response from Gemini.", raw: "" };
    }

    // Remove markdown-style code block if present
    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanedText);
      return parsed;
    } catch (err) {
      console.error("Failed to parse Gemini JSON:", err);
      return {
        error: "Gemini returned invalid JSON.",
        raw: text,
      };
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    return {
      error: "API call failed. Check your key or network.",
    };
  }
};

export default callGeminiTextAPI;
