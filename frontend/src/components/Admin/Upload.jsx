import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Upload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === "image" ? "image" : "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { url } = res.data;
      return url; // Return the Cloudinary URL
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imgUrl = await uploadFile("image");
      const videoUrl = await uploadFile("video");
      console.log("begin to send");
      // Send imgUrl and videoUrl to backend
      // await axios.post(`${process.env.VITE_BACKEND_BASEURL}/api/videos`, {
      //   imgUrl,
      //   videoUrl,
      // });
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/videos`,
          { imgUrl, videoUrl }
        );
        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }

      console.log(" send");

      setImg(null);
      setVideo(null);
      console.log("Files uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <br />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
      {loading && (
        <ThreeDots
          visible={true}
          height={80}
          width={80}
          color="#4fa94d"
          radius={9}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </div>
  );
};

export default Upload;
