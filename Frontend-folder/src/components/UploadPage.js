// src/components/UploadPage.js
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
    <PageContainer>
      <h2>Upload Image</h2>
      <UploadForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Image:</Label>
          <Input type="file" onChange={handleFileChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Tags:</Label>
          <Input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            required
          />
        </FormGroup>
        <UploadButton type="submit">Upload</UploadButton>
      </UploadForm>
    </PageContainer>
  );
};

export default UploadPage;

const PageContainer = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UploadButton = styled.button`
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
