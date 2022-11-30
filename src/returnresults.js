import { useCallback } from 'react';
// ...
const SURVEY_ID = 1;

function App() {
  const survey = new Model(surveyJson);
  const surveyComplete = useCallback((sender) => {
    saveSurveyResults(
      "https://your-web-service.com/" + SURVEY_ID,
      sender.data
    )
  }, []);

  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}

function saveSurveyResults(url, json) {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.addEventListener('load', () => {
    // Handle "load"
  });
  request.addEventListener('error', () => {
    // Handle "error"
  });
  request.send(JSON.stringify(json));
}