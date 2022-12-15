//Basic express example with 'GET' route
const express = require("express");
const app = express();
const port = 4000;

const loca = require('./test')

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get("/hospital", (req, res) => {
  loca.getHospitals()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
  // loca.getVaxCenters()
  // .then(response => {
  //   res.status(200).send(response);
  // })
  // .catch(error => {
  //   res.status(500).send(error);
  // })
  // loca.getTestCenters()
  // .then(response => {
  //   res.status(200).send(response);
  // })
  // .catch(error => {
  //   res.status(500).send(error);
  // })
});


app.listen(port, () => console.log(`Server started on port ${port}`));