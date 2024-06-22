import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Upload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log('1');

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

    try {
      
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === 'image' ? 'image' : 'video';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { url } = res.data;
      console.log( url);
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imgUrl = await uploadFile('image');
      const videoUrl = await uploadFile('video');

      // Example of using backend base URL from environment variable
      // const backendBaseUrl = process.env.REACT_APP_CLOUDINARY_BACKEND_BASEURL;
      // await axios.post(`${backendBaseUrl}/api/videos`, { imgUrl, videoUrl });

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
          <input type="file" accept="video/*" id="video" onChange={(e) => setVideo((prev)=>e.target.files[0])} />
        </div>
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input type="file" accept="image/*" id="img" onChange={(e) => setImg((prev)=>e.target.files[0])} />
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
