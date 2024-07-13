// import React, { useState, useEffect } from "react";

// const FileReader = (docUrl) => {
//   const [fileContent, setFileContent] = useState("");
//   const fileUrl = docUrl.docUrl; 


//   useEffect(() => {
//     const fetchFileContents = async () => {
//       try {
//         const response = await fetch(fileUrl);
//         const text = await response.text();
//         setFileContent(text);
//       } catch (error) {
//         console.error('Error fetching the file:', error);
//       }
//     };

//     fetchFileContents();
//   }, []);

//   // Function to determine if line should be bold
//   const shouldBold = (line, index) => {
//     // First line should always be bold
//     if (index === 0) {
//       return true;
//     }
//     // Other lines should be bold if length is less than 30 characters
//     return line.trim().length < 30;
//   };

//   return (
//     <div style={{ padding: "20px"}}>
//       <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
//         {/* Display each line with conditional styling */}
//         {fileContent.split("\n").map((line, index) => (
//           <div
//             key={index}
//             className={shouldBold(line, index) ? (index === 0 ? "text-3xl font-bold text-gray-800 " : "font-bold ") : ""}
//             style={{ marginBottom: "10px" }}
//           >
//             {line}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default FileReader;

import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

const fetchFileFromCloudinary = async (fileUrl) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    return blob.arrayBuffer();
};

const FileReader = ({ docUrl }) => {

    const fileUrl = docUrl;
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const convertDocxToHtml = async () => {
            try {
                const arrayBuffer = await fetchFileFromCloudinary(fileUrl);
                const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
                setHtmlContent(html);
            } catch (error) {
                console.error('Error converting file:', error);
            }
        };

        if (fileUrl) {
            convertDocxToHtml();
        }
    }, [fileUrl]);

    return (
        <div>
            {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FileReader;
