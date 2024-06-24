// src/components/UploadPage.js
import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTagsChange = (e) => setTags(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);

    try {
      await axios.post("/api/upload", formData);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
