import React, { useState } from 'react';

const AssignmentSection = ({ assignments }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState({});
  
  const handleOptionChange = (questionNo, selectedOption) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionNo]: selectedOption
    }));
    
    setShowResult(prevState => ({
      ...prevState,
      [questionNo]: true
    }));
  };

  return (
    <div>
      {assignments.map((question, index) => (
        <div key={index}>
          <h4 className='font-bold mb-2'>{`Question ${index+1}: ${question.questionText}`}</h4>
          {question.options.map((option, idx) => (
            <div key={idx}  className="option-box radio-container">
              <input
                type="radio"
                id={`question-${index}-option-${idx}`}
                name={`question-${index}`}
                value={option}
                checked={selectedOptions[question.questionNo] === option}
                onChange={() => handleOptionChange(question.questionNo, option)}
              />
              <label htmlFor={`question-${index}-option-${idx}`}> {option}</label>
            </div>
          ))}
          {showResult[question.questionNo] && (
            <div>
              {selectedOptions[question.questionNo] === question.correctAnswer ? (
                <p style={{ color: 'green' }}>Correct!</p>
              ) : (
                <p style={{ color: 'red' }}>Incorrect! The correct answer is {question.correctAnswer}.</p>
              )}
              <p className='mb-2'>Explanation: {question.explanation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentSection;
