import React from "react";

import {render} from 'react-dom';
import './style/index.css';
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './AuthContext'
import App from "./App";

render(
  <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </BrowserRouter>, document.getElementById('root')
);
