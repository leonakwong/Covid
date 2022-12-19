import React from "react";
import img1 from "./images/covid.png";
import './App.css';

function Home() {
  return (
    <div className="center">
      <br />
      <h1>Welcome to Project Hygieia</h1>
      <br></br>
      <div className="rounded">
       <img src={img1}></img>
      </div>
      <br></br>
      <br></br>
      <p>This website was created to educate, guide, and inform users on COVID-19. There is a lot of misinformation and panic surrounding
        COVID-19, which lead to the creation of Project Hygieia. Part of defeating the pandemic is taking the right actions, which is why
        there is questionaire and maps to guide you to test sites and vaccine centers. Another feature of the site is the news feed, which 
        brings you top headlines from around the world regarding COVID-19. Feel free to jump around the site and explore!
      </p>
    </div>
  );
}

export default Home;
