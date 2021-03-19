import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes";
import axios from "axios";

axios.defaults.baseURL =  "http://localhost:3001";


ReactDOM.render(
  <React.StrictMode>
    {Routes()}
  </React.StrictMode>,
  document.getElementById('root')
);

