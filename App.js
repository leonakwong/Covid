import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import Form from './Form';
import NewsList from './NewsList';
import Map from './Map';
import Map2 from './Map2';
import Home from './Home';
import FindVaccine from './FindVaccine';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  const [data, setData] = React.useState(null);
  return (
    <>
      <div>
        <p>{!data ? "Loading..." : data}</p>
      </div>
      <BrowserRouter>
        <div className="App">
          <Navbar fixed='top' bg='myBlue' variant="dark">
            <Navbar.Brand> Project Hygieia </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/App">Home</Nav.Link>
              <Nav.Link as={Link} to="/FindVaccine">Find Locations</Nav.Link>
              <Nav.Link as={Link} to="/NewsList">News</Nav.Link>
              <Nav.Link href="https://www.google.com/search?q=Data+Visualized">Data Visualized</Nav.Link>
              <Nav.Link as={Link} to="/Map">Covid Case Map</Nav.Link>
              <Nav.Link as={Link} to="/Map2">Test Center Map</Nav.Link>
            </Nav>
          </Navbar>
          <div id="XXX">
            <Routes>
              <Route path="/App" element={<Home />} />
              <Route path="/FindVaccine" element={<FindVaccine />} />
              <Route path="/NewsList" element={<NewsList />} />
              <Route path="/Map" element={<Map />} />
              <Route path="/Map/:zipcode" element={<Map />} />
              <Route path="/Map2" element={<Map2 />} />
              <Route path="/Map2/:zipcode" element={<Map2 />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
