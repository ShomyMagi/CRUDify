import React from "react";
import { useNavigate } from "react-router-dom";

import {
  setEditingPost,
  setNewPostBody,
  setNewPostTitle,
} from "../redux/blog-post/blogPostSlice";
import { Button } from "./Button";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    setNewPostTitle("");
    setNewPostBody("");
    setEditingPost(null);

    navigate(-1);
  };

  return (
    <Button onClick={handleClick} variant="back">
      &larr; Back
    </Button>
  );
};
