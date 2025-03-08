import React from "react";
import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Montserrat", sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }

    .app {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    a {
      text-decoration: none;
    }
  `}`,
);
