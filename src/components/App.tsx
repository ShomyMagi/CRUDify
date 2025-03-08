import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { Form } from "./Form";
import { Post } from "./Post";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<Post />} path="posts/:id" />
      <Route element={<Form />} path="users/:id/new-post" />
    </Routes>
  </BrowserRouter>
);
