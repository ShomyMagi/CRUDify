import "./Post.scss";
import "./Form.scss";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  editPost,
  removePost,
  selectBlogPosts,
  setEditingPost,
} from "../redux/blog-post/blogPostSlice";
import { BackButton } from "./BackButton";
import { Button } from "./Button";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const blogPosts = useTypedSelector(selectBlogPosts);
  const editingPost = useTypedSelector((state) => state.blogPost.editingPost);

  const post = blogPosts.find((pos) => pos.id === id);

  if (!post) {
    return <p>Post not found!</p>;
  }

  // prepare editing a post
  const handleEdit = () => {
    dispatch(
      setEditingPost({
        id: post.id,
        userId: post.userId,
        datePosted: post.datePosted,
        title: post.title,
        body: post.body,
      }),
    );
  };

  // cancel editing a post
  const handleCancelEdit = () => {
    dispatch(setEditingPost(null));
  };

  // editing a post
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!editingPost?.title || !editingPost?.body) {
      return;
    }

    const data = {
      userId: post.userId,
      datePosted: post.datePosted,
      title: editingPost.title,
      body: editingPost.body,
    };

    dispatch(editPost({ postId: post.id, data }));
    dispatch(setEditingPost(null));
  };

  // deleting a post
  const handleDelete = () => {
    dispatch(removePost(post.id));
    navigate("/");
  };

  return (
    <div className="post-container">
      <BackButton />
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-date">
          {new Date(post.datePosted).toLocaleDateString()}
        </p>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>

      {editingPost?.id === post.id ? (
        <div className="post-container">
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) =>
                dispatch(
                  setEditingPost({ ...editingPost, title: event.target.value }),
                )
              }
              type="text"
              value={editingPost.title}
            />
            <input
              onChange={(event) =>
                dispatch(
                  setEditingPost({ ...editingPost, body: event.target.value }),
                )
              }
              type="text"
              value={editingPost.body}
            />
            <div className="button-container">
              <Button type="submit" variant="secondary">
                Save
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="post-actions">
          {editingPost?.id !== post.id && (
            <Button className="single" onClick={handleEdit} variant="primary">
              Edit post
            </Button>
          )}
          <Button className="single" onClick={handleDelete} variant="delete">
            Delete post
          </Button>
        </div>
      )}
    </div>
  );
};
