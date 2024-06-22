import React, { useState, useEffect } from "react";
import { collection, query, getDocs, addDoc, where } from "firebase/firestore";
import { firestore, serverTimestamp } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Define the QuestionCard component
const QuestionCard = ({ id, question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="question-card border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question_${id}`} // Ensure each question has a unique name
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Assessment = ({ moduleId }) => {
  const questionsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const toggleAddQuestionModal = () => {
    setShowAddQuestionModal((prev) => !prev);
  };

  const handleAddQuestion = async (newQuestion) => {
    try {
      const docRef = await addDoc(collection(firestore, `modules/${moduleId}/questions`), {
        ...newQuestion,
        timestamp: serverTimestamp()
      });
      setQuestions((prevQuestions) => [...prevQuestions, { ...newQuestion, id: docRef.id }]);
      toggleAddQuestionModal();
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const q = query(collection(firestore, `modules/${moduleId}/questions`));
      const querySnapshot = await getDocs(q);
      const questionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [moduleId]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage * questionsPerPage < questions.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {questions
        .slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage)
        .map((question, index) => (
          <QuestionCard key={index} {...question} />
        ))}
      <div className="flex justify-center mt-6">
        {currentPage > 1 && (
          <button
            onClick={prevPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Previous
          </button>
        )}
        {currentPage * questionsPerPage < questions.length && (
          <button
            onClick={nextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
        <button
          onClick={toggleAddQuestionModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Add Question
        </button>
      </div>
      {showAddQuestionModal && (
        <AddQuestionModal onClose={toggleAddQuestionModal} onAdd={handleAddQuestion} />
      )}
    </div>
  );
};

const AddQuestionModal = ({ onClose, onAdd }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { question, options };
    onAdd(newQuestion);
    setQuestion("");
    setOptions(["", "", "", ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Add Question</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
            required
          />
          <label className="block mb-2">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border border-gray-400 rounded-lg p-2 mb-2 w-full"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assessment;
