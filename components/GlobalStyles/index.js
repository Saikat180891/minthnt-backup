import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: #000000;
  color: #FFFFFF;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

:focus {outline:0 !important;}

button{
  outline: none;
}
button:active{
  outline: none;
}
button:focus{
  outline: none;
}


`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
