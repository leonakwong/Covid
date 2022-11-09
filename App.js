import './App.css';

//import { useCallback } from "react";

import React, { useState } from 'react';
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Link, renderMatches } from 'react-router-dom';

StylesManager.applyTheme("defaultV2");

const surveyJson = {
  elements: [
    {
      name: "zipcode",
      title: "Enter your zipcode:",
      type: "text"
    },
    {
      "type": "radiogroup",
      "name": "service",
      "title": "What are you looking for?",
      "isRequired": true,
      "showNoneItem": false,
      "colCount": 1,
      "choices": [
        "Vaccine",
        "Rapid Testing",
        "Hospitals"
      ]
    },
    {
      "type": "radiogroup",
      "name": "vaccine",
      "title": "What vaccine are you looking for?",
      "visibleIf": "{service} = 'Vaccine'",
      "colCount": 1,
      "choices": [
        "Moderna",
        "Pfizer BioTech",
        "Jansenn",
        "Novavax",
        "Moderna Bivalent Booster",
        "Pfizer BioTech Bivalent Booster"
      ]
    },
    {
      "type": "radiogroup",
      "name": "rapid",
      "title": "What vaccine are you looking for?",
      "visibleIf": "{service} = 'Rapid Testing'",
      "colCount": 1,
      "choices": [
        "Express PCR Test",
        "Mobile Test to Treat",
        "At Home Covid-19 Kit Pickup"
      ]
    }
  ]
};

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.express));
  }, []);

  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;
  let serviceType, vaccine, rapidTest;
  const [zipcode, setZipcode] = useState(survey.getQuestionByName("zipcode"))
  serviceType = survey.getQuestionByName("service");

  console.log(serviceType.value);
  console.log(zipcode.value);
  
  /*const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  survey.onComplete.add(alertResults);*/
  
  survey.completedHtml = "Loading...";

  /*if (serviceType === "Vaccine") {*/
    survey
    .onComplete
    /*.add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    })*/
    .add(function(survey) {
      window.location.href = "https://github.com/leonakwong/Covid/actions/new";
    });
  //};
  
/*<div>
      <p>{!data ? "Loading..." : data}</p>
    </div>*/

  return <>
    <div className="App">
      <Navbar bg='myBlue' variant="dark">
        <Navbar.Brand> Project Hygieia</Navbar.Brand>
    
        <Nav>
          <Nav.Link href="App.js">Home</Nav.Link>
          <Nav.Link href="">News</Nav.Link>
          <Nav.Link href="">Data Visualized</Nav.Link>
        </Nav>
      </Navbar>
    </div>
    <Survey model={survey} />
  </>
  };

export default App;
