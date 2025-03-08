import "./Form.scss";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  addPost,
  selectNewPost,
  setNewPostBody,
  setNewPostTitle,
} from "../redux/blog-post/blogPostSlice";
import { BackButton } from "./BackButton";
import { Button } from "./Button";

export const Form = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newPost = useTypedSelector(selectNewPost);

  // adding a new user
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPost?.title || !newPost?.body) {
      return;
    }

    const postToSubmit = {
      id: crypto.randomUUID(),
      userId: Number(id),
      datePosted: new Date().toISOString(),
      title: newPost.title,
      body: newPost.body,
    };

    dispatch(addPost(postToSubmit))
      .then(() => {
        // eslint-disable-next-line no-console
        console.log("Post added successfully!");
        navigate(-1);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error adding post:", error);
      });
  };

  return (
    <div className="post-container">
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => dispatch(setNewPostTitle(event.target.value))}
          placeholder="Title"
          required
          type="text"
          value={newPost.title}
        />
        <textarea
          onChange={(event) => dispatch(setNewPostBody(event.target.value))}
          placeholder="Body"
          required
          value={newPost.body}
        />
        <div className="button-container">
          <Button type="submit" variant="secondary">
            Add
          </Button>
          <BackButton />
        </div>
      </form>
    </div>
  );
};
