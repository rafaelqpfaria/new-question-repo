import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename={'/new-question-repo'}>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

