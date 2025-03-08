import "./User.scss";

import React from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  removeUser,
  setExpandedRow,
  UserInterface,
} from "../redux/user/userSlice";
import { Button } from "./Button";
import { PostList } from "./PostList";

interface UserProps {
  user: UserInterface;
  index: number;
}

export const User = ({ user, index }: UserProps) => {
  const dispatch = useAppDispatch();
  const expandedRowId = useTypedSelector((state) => state.user.expandedRowId);

  // expanding/reducing user row
  const handleClickUser = (id: number): void => {
    dispatch(setExpandedRow(expandedRowId === id ? null : id));
  };

  // deleting a user
  const handleUserDelete = (id: number): void => {
    dispatch(removeUser(id));
  };

  return (
    <>
      <tr className="user-row">
        <td>{index + 1}.</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>
          <Button className="single" onClick={() => handleClickUser(user.id)}>
            {expandedRowId === user.id ? "Reduce" : "Expand"}
          </Button>
        </td>
        <td>
          <Link to={`users/${user.id}/new-post`}>
            <Button className="single" variant="secondary">
              Add
            </Button>
          </Link>
        </td>
        <td>
          <Button
            className="single"
            onClick={() => handleUserDelete(user.id)}
            variant="delete"
          >
            Delete
          </Button>
        </td>
      </tr>
      {expandedRowId === user.id && (
        <tr className="expanded-row">
          <td colSpan={8}>
            <PostList userId={user.id} />
          </td>
        </tr>
      )}
    </>
  );
};
