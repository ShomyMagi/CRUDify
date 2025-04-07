import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { Form } from "./Form";
import { Post } from "./Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
  {
    path: "/users/:id/new-post",
    element: <Form />,
  },
]);

export const App = () => <RouterProvider router={router} />;