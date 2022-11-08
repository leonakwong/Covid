import './App.css';

//import { useCallback } from "react";

import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

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
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;
  let zipcode, serviceType, vaccine, rapidTest;
  serviceType = survey.getQuestionByName("service");
  zipcode = survey.getQuestionByName("zipcode");
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
  #};
  
  return <Survey model={survey} />;
}

export default App;

