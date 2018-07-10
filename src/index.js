// import react
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

// import App components and CSS
import App from './App'
import './index.css'

// Wrap the App component in the React Router
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root')
);
