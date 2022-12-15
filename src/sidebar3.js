import React from "react";
import Map from "./Map3";
import "./App.css";
import "./sidebar.css";

function SideBar3() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.express));
  // }, []);

  return (
    <div>
      <>
      <nav id="menu"></nav>

        <div className="side">
          <div className="heading">
            <h1>Hospitals</h1>
          </div>
          <div id="listings" className="listings" />
        </div>
        <div id="map" className="map">
          <Map />
        </div>
      </>
    </div>
  );
}

export default SideBar3;