import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import Form from './Form';
import NewsList from './NewsList';
import Map from './Map';
import Map2 from './Map2';
import Home from './Home';
//import { DataComponent } from './Data.tsx';
import FindVaccine from './FindVaccine';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SideBar from './sidebar';
import SideBar2 from './sidebar2';
import DataComponent from './Data.tsx';


function App() {
  const [data, setData] = React.useState(null);
  return (
    <>
      <div>
        <p>{!data ? "Loading..." : data}</p>
      </div>
      <BrowserRouter>
        <div className="App">
          <div>
          <Navbar fixed='top' bg='myBlue' variant="dark" className="sticky-nav">
            <Navbar.Brand> Project Hygieia </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/App">Home</Nav.Link>
              <Nav.Link as={Link} to="/FindLocations">Find Locations</Nav.Link>
              <Nav.Link as={Link} to="/NewsList">News</Nav.Link>
              <Nav.Link as={Link} to="/Data">Data Visualized</Nav.Link>
              <Nav.Link as={Link} to="/Vaccine">Vaccine Map</Nav.Link>
              <Nav.Link as={Link} to="/RapidTesting">Test Center Map</Nav.Link>
            </Nav>
          </Navbar>
          </div>
          <div>
            <Routes>
              <Route path="/App" element={<Home />} />
              <Route path="/FindLocations" element={<FindVaccine />} />
              <Route path="/NewsList" element={<NewsList />} />
              <Route path="/Vaccine" element={<SideBar />} />
              <Route path="/Vaccine/:zipcode" element={<SideBar />} />
              <Route path="/RapidTesting" element={<SideBar2 />} />
              <Route path="/RapidTesting/:zipcode" element={<SideBar2 />} />
              <Route path="/Data" element={<DataComponent />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;