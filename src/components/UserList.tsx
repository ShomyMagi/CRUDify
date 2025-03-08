import "./UserList.scss";

import React, { useEffect } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchBlogPosts } from "../redux/blog-post/blogPostSlice";
import {
  fetchUsers,
  selectLoading,
  selectUsers,
  selectVisibleUsers,
  showLessUsers,
  showMoreUsers,
} from "../redux/user/userSlice";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import { User } from "./User";

export const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);
  const visibleUserList = useTypedSelector(selectVisibleUsers);
  const loading = useTypedSelector(selectLoading);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
    if (visibleUserList.length === 0) {
      dispatch(fetchBlogPosts());
    }
  }, [users.length, visibleUserList.length]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Expand/Reduce</th>
            <th>Add Post</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {visibleUserList.map((user, index) => (
            <User index={index} key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      <div className="">
        {visibleUserList.length < users.length && (
          <Button onClick={() => dispatch(showMoreUsers())}>
            Show more Users
          </Button>
        )}
        {visibleUserList.length > 10 && (
          <Button onClick={() => dispatch(showLessUsers())}>
            Show less Users
          </Button>
        )}
      </div>
    </>
  );
};
