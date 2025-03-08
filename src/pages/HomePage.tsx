import "./HomePage.scss";

import React from "react";
import { Link } from "react-router-dom";

import { GlobalStyles } from "../components/GlobalStyles/GlobalStyles";
import { UserList } from "../components/UserList";

export const HomePage = () => (
  <>
    <GlobalStyles />
    <div className="home-container">
      <header>
        <h1>
          <Link to="/">CRUDify</Link>
        </h1>
      </header>

      <main>
        <UserList />
      </main>
    </div>
  </>
);
