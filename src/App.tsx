import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.scss';
import { Col, Container, Nav, NavDropdown, Row } from 'react-bootstrap';

import { Sidebar } from './components/Sidebar/Sidebar';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { AppWrapper } from './AppWrapper';
import { TopNav } from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <AppWrapper></AppWrapper>
    </Router>
  );
}

export default App;
