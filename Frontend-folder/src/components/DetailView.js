// src/components/DetailView.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  if (!image) return <div>Loading...</div>;

  return (
    <div>
      <h2>Image Details</h2>
      <img src={image.fullResolutionUrl} alt={image.tags} />
      <p>{image.tags}</p>
      <p>{image.metadata}</p>
    </div>
  );
};

export default DetailView;
