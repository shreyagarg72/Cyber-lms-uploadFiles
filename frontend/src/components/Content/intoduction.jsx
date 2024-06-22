import React, { useState, useEffect } from "react";
import { serverTimestamp, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const IntroductionContent = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-600 hover:text-blue-900 text-center">
        {title}
      </h2>
      <p className="text-black text-left font-medium text-base">
        {description}
      </p>
    </div>
  );
};

const Introduction = ({ moduleId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [introductions, setIntroductions] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const itemsPerPage = 5; // Number of items per page
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    if (moduleId) {
      fetchIntroductions();
    }
  }, [moduleId, currentPage]); // Trigger fetchIntroductions whenever moduleId or currentPage changes

  const fetchIntroductions = async () => {
    try {
      const q = query(collection(firestore, `modules/${moduleId}/introduction`), where("moduleId", "==", moduleId));
      const snapshot = await getDocs(q);
      const introductionsData = snapshot.docs.map(doc => doc.data());
      setIntroductions(introductionsData);

      // Calculate total pages
      const totalItems = introductionsData.length;
      const pages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching introductions:", error);
      setError("Error fetching introductions. Please try again later.");
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const newIntroduction = {
        title: newTitle,
        description: newDescription,
        moduleId: moduleId,
        createdAt: serverTimestamp(),
      };

      // Store the new introduction in Firebase
      const docRef = await addDoc(collection(firestore, `modules/${moduleId}/introduction`), newIntroduction);
      console.log("Introduction added successfully with ID:", docRef.id);
      
      // Fetch introductions again to update the list
      fetchIntroductions();
      
      // Reset form fields
      setNewTitle("");
      setNewDescription("");
      
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Error adding introduction:", error);
      setError("Error adding introduction. Please try again later.");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        {!showForm ? (
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowForm(true)}>
              Add
            </button>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-6 rounded-md z-20 border-black mt-8" style={{ width: "90%", maxWidth: "600px" }}>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => setShowForm(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Introduction</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required 
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)} 
                  rows="3" 
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700">Submit</button>
            </form>
          </div>
        )}
      </div>
      {introductions
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((intro, index) => (
          <IntroductionContent key={index} title={intro.title} description={intro.description} />
      ))}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevPage}>
            Previous
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextPage}>
            Next
          </button>
        </div>
      )}
      {currentPage === totalPages && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6" onClick={handlePrevPage}>
          Next
        </button>
      )}
    </div>
  );
};

export default Introduction;
