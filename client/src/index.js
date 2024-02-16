import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <ChakraProvider>
        <GoogleOAuthProvider clientId='288451376498-ikvefe1s9v1529ep72nnnr99335kog9t.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </ChakraProvider>
    </Router>
);


