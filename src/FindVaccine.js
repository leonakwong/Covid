import "./App.css";

import React, { useState, useCallback } from "react";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import Papa from "papaparse";
import { redirect, useNavigate } from "react-router-dom";

StylesManager.applyTheme("defaultV2");

const surveyJson = {
  elements: [
    {
      name: "zipcode",
      title: "Enter your zipcode:",
      type: "text",
    },
    {
      type: "radiogroup",
      name: "service",
      title: "What are you looking for?",
      isRequired: true,
      showNoneItem: false,
      colCount: 1,
      choices: ["Vaccine", "Rapid Testing", "Hospitals"],
    },
    {
      type: "radiogroup",
      name: "vaccine",
      title: "What vaccine are you looking for?",
      visibleIf: "{service} = 'Vaccine'",
      colCount: 1,
      choices: [
        "Moderna",
        "Pfizer BioTech",
        "Jansenn",
        "Novavax",
        "Moderna Bivalent Booster",
        "Pfizer BioTech Bivalent Booster",
      ],
    },
    {
      type: "radiogroup",
      name: "rapid",
      title: "What testing are you looking for?",
      visibleIf: "{service} = 'Rapid Testing'",
      colCount: 1,
      choices: ["Express PCR Test", "Mobile Test to Treat"],
    },
    // ],
    // "completedHtmlOnCondition": [
    //   {
    //     "expression": "{service} = 'Vaccine'",
    //     "html": "<meta http-equiv='Refresh' content='0; url=https://github.com/leonakwong/Covid/actions/new' />"
    //   }, {
    //     "expression": "{service} = 'Rapid Testing'",
    //     "html": "<meta http-equiv='Refresh' content='0; url=http://localhost:3000/App.js' />"
    //   }
  ],
};

// const survey = new Model(surveyJson);
// const serviceType = survey.getQuestionByName("service");
// console.log(serviceType.value);

let zips = [
  10001, 10002, 10003, 10004, 10005, 10006, 10007, 10009, 10010, 10011, 10012,
  10013, 10014, 10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025,
  10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036,
  10037, 10038, 10039, 10040, 10044, 10065, 10069, 10075, 10128, 10280, 10282,
  10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308, 10309, 10310, 10312,
  10314, 10451, 10452, 10453, 10454, 10455, 10456, 10457, 10458, 10459, 10460,
  10461, 10462, 10463, 10464, 10465, 10466, 10467, 10468, 10469, 10470, 10471,
  10472, 10473, 10474, 10475, 11004, 11101, 11102, 11103, 11104, 11105, 11106,
  11109, 11201, 11203, 11204, 11205, 11206, 11207, 11208, 11209, 11210, 11211,
  11212, 11213, 11214, 11215, 11216, 11217, 11218, 11219, 11220, 11221, 11222,
  11223, 11224, 11225, 11226, 11228, 11229, 11230, 11231, 11232, 11233, 11234,
  11235, 11236, 11237, 11238, 11239, 11354, 11355, 11356, 11357, 11358, 11360,
  11361, 11362, 11363, 11364, 11365, 11366, 11367, 11368, 11369, 11370, 11372,
  11373, 11374, 11375, 11377, 11378, 11379, 11385, 11411, 11412, 11413, 11414,
  11415, 11416, 11417, 11418, 11419, 11420, 11421, 11422, 11423, 11426, 11427,
  11428, 11429, 11432, 11433, 11434, 11435, 11436, 11691, 11692, 11693, 11694,
  11697,
];
let zip = 1000;

function FindVaccine() {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.express));
  }, []);

  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    const zipNum = Number(sender.data.zipcode);
      for (let i = 0; i < zips.length; i++) {
        if (zipNum === zips[i]) {
          zip = i;
        }
      }
      if (zip == 1000){
        alert("Enter a zipcode in the New York City area.");
        navigate("/FindLocations");
      }
    switch (sender.data.service) {
      case "Vaccine":
        navigate("/Vaccine/" + sender.data.zipcode);
        break;
      case "Rapid Testing":
        navigate("/Vaccine/" + sender.data.zipcode);
        break;
      default:
      // code block
    }

    Papa.parse(
      "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          console.log(results);
        },
      }
    );
  }, []);

  survey.onComplete.add(alertResults);

  return (
    <>
      <div>
        <p>{!data ? "Loading..." : data}</p>
      </div>
      <Survey model={survey} />
    </>
  );
}

export default FindVaccine;
