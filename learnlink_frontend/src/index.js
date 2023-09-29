import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/user';
import { BrowsingUserProvider } from './context/browsing_user';
import { BrowserRouter as Router } from 'react-router-dom'

function Wrapper() {
  return (
    <Router>
      <UserProvider>
        <BrowsingUserProvider>
          <App />
        </BrowsingUserProvider>
      </UserProvider>
    </Router>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<Wrapper />, root);