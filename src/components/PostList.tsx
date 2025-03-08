import "./PostList.scss";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { removePost, selectBlogPosts } from "../redux/blog-post/blogPostSlice";
import { Button } from "./Button";

interface PostListProps {
  userId: number;
}

export const PostList = ({ userId }: PostListProps) => {
  const dispatch = useAppDispatch();
  const blogPosts = useTypedSelector(selectBlogPosts);
  const [sortOrder, setSortOrder] = useState("desc");

  // deleting a post
  const handlePostDelete = (id: string): void => {
    dispatch(removePost(id));
  };

  // toggling state by asc/desc
  const handleSort = () => {
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  // filtering posts by a user
  // sorting posts by date asc/desc
  const filteredPosts = useMemo(
    () =>
      [...blogPosts]
        .filter((post) => post.userId === userId)
        .sort((a, b) =>
          sortOrder === "asc"
            ? new Date(a.datePosted).getTime() -
              new Date(b.datePosted).getTime()
            : new Date(b.datePosted).getTime() -
              new Date(a.datePosted).getTime(),
        ),
    [blogPosts, userId, sortOrder],
  );

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h4>Blog Posts:</h4>
        <Button className="single" onClick={handleSort} variant="primary">
          Sort by Date {sortOrder === "asc" ? "Descending" : "Ascending"}
        </Button>
      </div>
      {filteredPosts.map((post) => (
        <div className="post-list-title" key={post.id}>
          <Link to={`posts/${post.id}`}>
            <p className="post-list-item">{post.title}</p>
          </Link>
          <Button
            className="single"
            onClick={() => handlePostDelete(post.id)}
            variant="delete"
          >
            Delete Post
          </Button>
        </div>
      ))}
    </div>
  );
};
