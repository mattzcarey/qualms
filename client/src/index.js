import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import { CookiesProvider } from "react-cookie";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <CookiesProvider>
    <Routing />
  </CookiesProvider>,
  rootElement
);

