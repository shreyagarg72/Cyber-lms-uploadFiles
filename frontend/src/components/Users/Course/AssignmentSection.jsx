// import React, { useState, useEffect } from "react";

// const AssignmentSection = ({ assignments }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showResult, setShowResult] = useState({});

//   useEffect(() => {
//     const initialShowResult = assignments.reduce((acc, _, index) => {
//       acc[index] = false;
//       return acc;
//     }, {});
//     setShowResult(initialShowResult);
//   }, [assignments]);

//   const handleOptionChange = (questionNo, selectedOption) => {
//     setSelectedOptions((prevState) => ({
//       ...prevState,
//       [questionNo]: selectedOption,
//     }));
//   };

//   const handleSubmit = () => {
//     const updatedShowResult = assignments.reduce((acc, _, index) => {
//       acc[index] = true;
//       return acc;
//     }, {});
//     setShowResult(updatedShowResult);
//   };

//   return (
//     <div>
//       {assignments.map((question, index) => (
//         <div key={index}>
//           <h4 className="font-bold mb-2">{`Question ${index + 1}: ${
//             question.questionText
//           }`}</h4>
//           {question.options.map((option, idx) => (
//             <div key={idx} className="option-box radio-container">
//               <input
//                 type="radio"
//                 id={`question-${index}-option-${idx}`}
//                 name={`question-${index}`}
//                 value={option}
//                 checked={selectedOptions[index] === option}
//                 onChange={() => handleOptionChange(index, option)}
//               />
//               <label htmlFor={`question-${index}-option-${idx}`}>
//                 {option}
//               </label>
//             </div>
//           ))}
//           {showResult[index] && (
//             <div>
//               {["A", "B", "C", "D"][question.options.indexOf(selectedOptions[index])] === question.correctAnswer[0] ? (
//                 <p style={{ color: "green" }}>Correct!</p>
//               ) : (
//                 <p style={{ color: "red" }}>
//                   Incorrect! The correct answer is {question.correctAnswer}.
//                 </p>
//               )}
//               <p className="mb-2">Explanation: {question.explanation}</p>
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AssignmentSection;
// import React, { useState, useEffect } from "react";

// const AssignmentSection = ({ assignments }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showResult, setShowResult] = useState({});

//   useEffect(() => {
//     const initialShowResult = assignments.reduce((acc, _, index) => {
//       acc[index] = false;
//       return acc;
//     }, {});
//     setShowResult(initialShowResult);
//   }, [assignments]);

//   const handleOptionChange = (questionNo, selectedOption) => {
//     setSelectedOptions((prevState) => ({
//       ...prevState,
//       [questionNo]: selectedOption,
//     }));
//   };

//   const handleSubmit = () => {
//     const updatedShowResult = assignments.reduce((acc, _, index) => {
//       acc[index] = true;
//       return acc;
//     }, {});
//     setShowResult(updatedShowResult);
//   };

//   return (
//     <div>
//       {assignments.map((question, index) => (
//         <div key={index} className="mb-9"> {/* Increase gap between questions */}
//           <h4 className="font-bold mb-4">{`Question ${index + 1}: ${question.questionText}`}</h4>
//           {question.options.map((option, idx) => (
//             <div key={idx} className="option-box radio-container mb-2"> {/* Add margin to options */}
//               <input
//                 type="radio"
//                 id={`question-${index}-option-${idx}`}
//                 name={`question-${index}`}
//                 value={option}
//                 checked={selectedOptions[index] === option}
//                 onChange={() => handleOptionChange(index, option)}
//               />
//               <label htmlFor={`question-${index}-option-${idx}`} className="ml-2">
//                 {option}
//               </label>
//             </div>
//           ))}
//           {showResult[index] && (
//             <div className="mt-2"> {/* Add margin to results */}
//               {["A", "B", "C", "D"][question.options.indexOf(selectedOptions[index])] === question.correctAnswer[0] ? (
//                 <p style={{ color: "green" }}>Correct!</p>
//               ) : (
//                 <p style={{ color: "red" }}>
//                   Incorrect! The correct answer is {question.correctAnswer}.
//                 </p>
//               )}
//               <p className="mt-2">Explanation: {question.explanation}</p> {/* Add margin to explanation */}
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         onClick={handleSubmit}
//         className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AssignmentSection;
import React, { useState, useEffect } from "react";

const AssignmentSection = ({ assignments, onAssignmentSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    const initialShowResult = assignments.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {});
    setShowResult(initialShowResult);
  }, [assignments]);

  const handleOptionChange = (questionNo, selectedOption) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionNo]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const updatedShowResult = assignments.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {});
    setShowResult(updatedShowResult);
    setShowPopup(true); // Show popup when the submit button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup

    if (onAssignmentSubmit) {
      onAssignmentSubmit();
    }
  };

  return (
    <div>
      {assignments.map((question, index) => (
        <div key={index} className="mb-9">
          <h4 className="font-bold mb-4">{`Question ${index + 1}: ${question.questionText}`}</h4>
          {question.options.map((option, idx) => (
            <div key={idx} className="option-box radio-container mb-2">
              <input
                type="radio"
                id={`question-${index}-option-${idx}`}
                name={`question-${index}`}
                value={option}
                checked={selectedOptions[index] === option}
                onChange={() => handleOptionChange(index, option)}
              />
              <label htmlFor={`question-${index}-option-${idx}`} className="ml-2">
                {option}
              </label>
            </div>
          ))}
          {showResult[index] && (
            <div className="mt-2">
              {["A", "B", "C", "D"][question.options.indexOf(selectedOptions[index])] === question.correctAnswer[0] ? (
                <p style={{ color: "green" }}>Correct!</p>
              ) : (
                <p style={{ color: "red" }}>
                  Incorrect! The correct answer is {question.correctAnswer}.
                </p>
              )}
              <p className="mt-2">Explanation: {question.explanation}</p>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Submit
      </button>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Yay! You completed the assignment!</h3>
            <button
              onClick={handleClosePopup}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentSection;
