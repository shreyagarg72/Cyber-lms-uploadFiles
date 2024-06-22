import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import faTrash icon
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; // Import deleteObject function
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; // Import deleteDoc function
import { storage, firestore } from "../../firebase";

const VideoForm = ({ moduleId }) => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(""); // State to store video URL after upload
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [videos, setVideos] = useState([]); // State to store fetched videos
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [videosPerPage] = useState(6); // Number of videos per page

  // Function to fetch videos from Firestore
  const fetchVideos = async () => {
    const videosCollectionRef = collection(firestore, `modules/${moduleId}/videos`);
    const snapshot = await getDocs(videosCollectionRef);
    const fetchedVideos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setVideos(fetchedVideos);
  };

  useEffect(() => {
    fetchVideos();
  }, [moduleId]); // Fetch videos when moduleId changes

  // Logic for pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Upload video to Firebase Storage
    const videoStorageRef = ref(storage, `videos/${moduleId}/${videoFile.name}`);
    await uploadBytes(videoStorageRef, videoFile);

    // Get download URL of the uploaded video
    const downloadURL = await getDownloadURL(videoStorageRef);
    setVideoUrl(downloadURL);

    // Store video metadata in Firestore
    const videosCollectionRef = collection(firestore, `modules/${moduleId}/videos`);
    await addDoc(videosCollectionRef, {
      title: title,
      url: downloadURL
    });

    // Reset form fields
    setTitle("");
    setVideoFile(null);

    // Close the video form
    setShowForm(false);

    // Fetch updated videos
    fetchVideos();
  };

  // Function to delete video
  const handleDeleteVideo = async (videoId, videoName) => {
    // Delete video from Firestore
    const videoDocRef = doc(firestore, `modules/${moduleId}/videos`, videoId);
    await deleteDoc(videoDocRef);

    // Fetch updated videos
    fetchVideos();
  };

  // Function to handle pagination navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowForm(true)}>
        Add Video
      </button>

      {showForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-6 rounded-md z-20 border-black mt-8" style={{ width: "90%", maxWidth: "600px" }}>
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => setShowForm(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="text-lg font-semibold mb-4">Add Video</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="video" className="block text-sm font-medium text-gray-700">Video File</label>
              <input type="file" id="video" name="video" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700">Submit</button>
          </form>
        </div>
      )}

      {/* Display fetched videos */}
      <div className="video-container flex flex-wrap">
        {currentVideos.map((video) => (
          <div key={video.id} className="mt-4 h-80 w-80 rounded-md">
            <div className="bg-gray-100 rounded-md p-4">
              <div className="video-card">
                <video className="video-player" controls style={{ width: "100%" }}>
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-lg font-semibold mt-2">{video.title}</p>
                {/* Delete button */}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleDeleteVideo(video.id, video.url.split('/').pop())}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastVideo >= videos.length} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Next</button>
      </div>
    </div>
  );
};

export default VideoForm;
