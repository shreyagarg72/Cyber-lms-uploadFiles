import React, { useState, useEffect } from "react";

const FileReader = (docUrl) => {
  const [fileContent, setFileContent] = useState("");
  const fileUrl = docUrl.docUrl; 


  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    };

    fetchFileContents();
  }, []);

  // Function to determine if line should be bold
  const shouldBold = (line, index) => {
    // First line should always be bold
    if (index === 0) {
      return true;
    }
    // Other lines should be bold if length is less than 30 characters
    return line.trim().length < 30;
  };

  return (
    <div style={{ padding: "20px"}}>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
        {/* Display each line with conditional styling */}
        {fileContent.split("\n").map((line, index) => (
          <div
            key={index}
            className={shouldBold(line, index) ? (index === 0 ? "text-3xl font-bold text-gray-800 " : "font-bold ") : ""}
            style={{ marginBottom: "10px" }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
export default FileReader;

