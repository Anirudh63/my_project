import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NoteWise from './notewisee'; // ✅ importing the `NoteWise` component from file notewisee.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteWise />
  </React.StrictMode>
);
