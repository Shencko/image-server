// src/components/DetailView.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const DetailView = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`/api/images/${id}`);
        setImage(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [id]);

  if (!image) return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <PageContainer>
      <h2>Image Details</h2>
      <Image src={image.fullResolutionUrl} alt={image.tags} />
      <Tags>{image.tags}</Tags>
      <Metadata>{image.metadata}</Metadata>
    </PageContainer>
  );
};

export default DetailView;

const PageContainer = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Tags = styled.p`
  margin: 10px 0;
  color: #666;
`;

const Metadata = styled.p`
  color: #666;
`;
