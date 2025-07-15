import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Login from './login';
import Signup from './Signup';
import NoteWise from './notewisee';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // show loading screen while checking auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Checking login status...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/"
          element={user ? <NoteWise /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
