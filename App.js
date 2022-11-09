
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';


function App() {
  
  return (
    <div className="App">
      <Navbar bg='myBlue' variant="dark">
        <Navbar.Brand>Project Hygieia</Navbar.Brand>
        
        <Nav>
          <Nav.Link href="App.js">Home</Nav.Link>
          <Nav.Link href="">News</Nav.Link>
          <Nav.Link href="">Data Visualized</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
  
}


export default App;
