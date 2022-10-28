import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import { AppWrapper } from './AppWrapper';

function App() {
  useEffect(() => {
    console.log('App rendered');
  }, [])
  return (
    <Router>
      <AppWrapper></AppWrapper>
    </Router>
  );
}

export default App;
