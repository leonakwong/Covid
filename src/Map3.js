import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
import covid1 from "./covidData2.json";
import Papa from "papaparse";
import { useParams } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXRoYW5sYXZpbnNreTQ2IiwiYSI6ImNsOWZ4YzI5dTBkbnkzdm14ZGlwbzUwbTgifQ.jByzOogEAXnVPymbyXjj-Q";

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
let zipInput = 10010;
let zip;

const Map = () => {
  const params = useParams();
  const zipcode = params.zipcode;
  if (!zipcode) {
    for (let i = 0; i < zips.length; i++) {
      if (zipInput === zips[i]) {
        zip = i;
      }
    }
  }
  else if (typeof zipcode === "string" && zipcode.trim().length !== 0) {
    console.log(zipcode);
    const zipNum = Number(zipcode);
    console.log(zipNum);
    for (let i = 0; i < zips.length; i++) {
      if (zipNum === zips[i]) {
        zip = i;
      }
    }
  }

  let mygeojson = { type: "FeatureCollection", features: [] };
  let stores;
  let test1;
  // const [test1, setTest1] = useState(false);
  // useEffect(() => {
  //   getHospital();
  // }, []);

  async function getHospital() {
    await fetch('http://localhost:4000/hospital')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // setTest1(responseJson);
        test1 = responseJson;
        console.log(test1);
      });

      for (let i = 0; i < test1.length; i++){
        mygeojson.features[i] = {
          type: "Feature",
          properties: {
            Name: test1[i].Name,
            Address: test1[i].Address,
            Borough: test1[i].Borough,
            Zip:test1[i].Zip,
            PhoneNumber: test1[i].PhoneNumber,
            Website: test1[i].Website,
            Mortality: test1[i].MortalityRate,
          },
          geometry: { 
            type: "Point",
            coordinates: test1[i].coordinates.split(', '),
          },
        };
      }; 
      stores = mygeojson;
      console.log(stores);
      stores.features.forEach(function (store, i) {
        store.properties.id = i;
      });
  };

  getHospital();

  let covid = [];

  async function processCsv() {
    const csvData1 = await new Promise((resolve) => {
      const data = [];
      Papa.parse(
        "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv",
        {
          header: true,
          download: true,
          step: function (result) {
            data.push(result.data);
          },
          complete: function (results, file) {
            resolve(data);
          },
        }
      );
    });

    const csvData2 = await new Promise((resolve) => {
      const data = [];
      Papa.parse(
        "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/hosp_death_last28days-by-modzcta.csv",
        {
          header: true,
          download: true,
          step: function (result) {
            data.push(result.data);
          },
          complete: function (results, file) {
            resolve(data);
          },
        }
      );
    });

    for (let i = 0; i < csvData2.length - 1; i++) {
      covid[i] = {
        ZIP: Number(csvData1[i].modzcta),
        ZIP_name: Number(csvData1[i].modzcta_name),
        people_positive_7day: Number(csvData1[i].people_positive),
        lat: Number(csvData1[i].lat),
        lon: Number(csvData1[i].lon),
        death_count_28day: Number(csvData2[i].death_count_28day),
        hospitalization_count_28day: Number(
          csvData2[i].hospitalization_count_28day
        ),
      };
    }
  }

  processCsv();

  console.log(zip);

  let data = [];
  let data2 = [];
  let data3 = [];

  let posArr = [];
  let hospArr = [];
  let deathArr = [];

  var middle = [covid1[zip].lon, covid1[zip].lat];


  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ethanlavinsky46/cla93j7p1000j14pa6sblzm26",
      center: middle,
      zoom: 15,
    });

    map.dragRotate.disable();

    map.touchZoomRotate.disableRotation();

    map.on("load", () => {
      for (let i = 0; i < covid.length; i++) {
        data.push({
          code: covid[i].ZIP.toString(),
          hosp: covid[i].hospitalization_count_28day,
        });
      }

      for (let i = 0; i < covid.length; i++) {
        data2.push({
          code: covid[i].ZIP.toString(),
          pos: covid[i].people_positive_7day,
        });
      }

      for (let i = 0; i < covid.length; i++) {
        data3.push({
          code: covid[i].ZIP.toString(),
          death: covid[i].death_count_28day,
        });
      }

      for (let i = 0; i < data.length; i++) {
        hospArr.push(data[i].hosp);
      }

      for (let i = 0; i < data2.length; i++) {
        posArr.push(data2[i].pos);
      }

      for (let i = 0; i < data3.length; i++) {
        deathArr.push(data3[i].death);
      }

      let posMax = Math.max.apply(null, posArr);
      let hospMax = Math.max.apply(null, hospArr);
      let deathMax = Math.max.apply(null, deathArr);

      const layers = [
        "Hospitalizations",
        "0",
        `${hospMax}`,
        "",
        "Positive Cases",
        "0",
        `${posMax}`,
        "",
        "Deaths",
        "0",
        `${deathMax}`,
      ];
      const colors = [
        "",
        "#000000",
        "#00ff00",
        "",
        "",
        "#000000",
        "#ff00ff",
        "",
        "",
        "#000000",
        "#0000ff",
      ];

      const legend = document.getElementById("legend");

      layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement("div");
        const key = document.createElement("span");
        key.className = "legend-key";
        key.style.backgroundColor = color;

        const value = document.createElement("span");
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      });

      // console.log(posMax);
      function addMarkers() {
        for (const marker of stores.features) {
          const el = document.createElement("div");
          el.id = `marker-${marker.properties.id}`;
          el.className = "marker";

          el.addEventListener("click", (e) => {
            flyToStore(marker);
            createPopUp(marker);
            const activeItem = document.getElementsByClassName("active");
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove("active");
            }
            const listing = document.getElementById(
              `listing-${marker.properties.id}`
            );
            listing.classList.add("active");
          });


          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        }
      }

      map.addSource("places", {
        type: "geojson",
        data: stores,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken, 
        mapboxgl: mapboxgl, 
        marker: true, 
        bbox: [-75.063812, 40.336768, -72.977783, 41.121429], 
      });

      // map.addControl(geocoder, "top-left");

      addMarkers();

      map.addSource("zips", {
        type: "vector",
        url: "mapbox://ethanlavinsky46.c5dqzdw0",
      });

      const matchExpression = ["match", ["get", "ZIP"]];
      const matchExpression2 = ["match", ["get", "ZIP"]];
      const matchExpression3 = ["match", ["get", "ZIP"]];

      for (const row of data) {
        const green = (row["hosp"] / hospMax) * 255;
        const color = `rgb(0, ${green}, 0)`;

        matchExpression.push(row["code"], color);
      }

      matchExpression.push("rgba(0, 0, 0, 0)");

      for (const row of data2) {
        const red = (row["pos"] / posMax) * 255;
        const color2 = `rgb( ${red},0, ${red})`;

        matchExpression2.push(row["code"], color2);
      }

      matchExpression2.push("rgba(0, 0, 0, 0)");

      for (const row of data3) {
        const blue = (row["death"] / deathMax) * 255;
        const color2 = `rgb( 0,0, ${blue})`;

        matchExpression3.push(row["code"], color2);
      }

      matchExpression3.push("rgba(0, 0, 0, 0)");

      map.addLayer(
        {
          id: "Hospitalizations",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            visibility: "none",
          },
          paint: {
            "fill-color": matchExpression,
            "fill-opacity": 0.75,
          },
        },
        "admin-1-boundary-bg"
      );

      map.addLayer(
        {
          id: "Positive Cases",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            visibility: "none",
          },
          paint: {
            "fill-color": matchExpression2,
            "fill-opacity": 0.75,
          },
        },
        "admin-1-boundary-bg"
      );

      map.addLayer(
        {
          id: "Deaths",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            visibility: "none",
          },
          paint: {
            "fill-color": matchExpression3,
            "fill-opacity": 0.5,
          },
        },
        "admin-1-boundary-bg"
      );

      map.on("click", (event) => {
        const features = map.queryRenderedFeatures(event.point, {
        });

        if (!features.length) return;

        const clickedPoint = features[0];

        flyToStore(clickedPoint);

        createPopUp(clickedPoint);

        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(
          `listing-${clickedPoint.properties.id}`
        );
        listing.classList.add("active");
      });

      buildLocationList(stores);

      const searchResult = middle;
      const options = { units: "miles" };
      for (const store of stores.features) {
        store.properties.distance = turf.distance(
          searchResult,
          store.geometry,
          options
        );
      }
      stores.features.sort((a, b) => {
        if (a.properties.distance > b.properties.distance) {
          return 1;
        }
        if (a.properties.distance < b.properties.distance) {
          return -1;
        }
        return 0;
      });
      const listings = document.getElementById("listings");
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(stores);
      const activeListing = document.getElementById(
        `listing-${stores.features[0].properties.id}`
      );
      activeListing.classList.add("active");

      const bbox = getBbox(stores, 0, searchResult);
      map.fitBounds(bbox, {
        padding: 100,
      });

      createPopUp(stores.features[0]);
    });

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15.5,
      });
    }

    function createPopUp(currentFeature) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      if (popUps[0]) popUps[0].remove();
  
      if (currentFeature.properties.Mortality){
        const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          `<h3><a href = "${currentFeature.properties.Website}">${currentFeature.properties.Name}</a></h3><h4>${currentFeature.properties.Address}, ${currentFeature.properties.Borough}, NY, ${currentFeature.properties.Zip}</h4><h5>Covid Mortality Rate: ${currentFeature.properties.Mortality}%</h5>`
        )
        .addTo(map);
      }
      else{
        const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          `<h3><a href = "${currentFeature.properties.Website}">${currentFeature.properties.Name}</a></h3><h4>${currentFeature.properties.Address}, ${currentFeature.properties.Borough}, NY, ${currentFeature.properties.Zip}</h4>`
        )
        .addTo(map);
      }
    }

    function buildLocationList(stores) {
      for (const store of stores.features) {
        const listings = document.getElementById("listings");
        const listing = listings.appendChild(document.createElement("div"));
        listing.id = `listing-${store.properties.id}`;
        listing.className = "item";

        const link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        link.className = "title";
        link.id = `link-${store.properties.id}`;
        if (store.properties.Mortality){
          link.innerHTML = ` <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/NYC_Health_%2B_Hospitals_logo.svg/1200px-NYC_Health_%2B_Hospitals_logo.svg.png" height = "25"></a>   ${store.properties.Name}`;
        }
        else{
          link.innerHTML = `${store.properties.Name}`;
        }
          
        const details = listing.appendChild(document.createElement("div"));
        if (store.properties.Address) {
          details.innerHTML += `${store.properties.Address}, ${store.properties.Borough}, NY, ${store.properties.Zip}`;
        }
        if (store.properties.distance) {
          const roundedDistance =
            Math.round(store.properties.distance * 100) / 100;
          details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }
        if (store.properties.Website) {
          details.innerHTML += `<a href=" ${store.properties.Website}"><img src="https://toppng.com/uploads/preview/web-png-jpg-transparent-stock-website-icon-blue-11563644926reanjnmk6x.png" width = "25" height = "25"></a>`;
        }
        if (store.properties.PhoneNumber) {
          details.innerHTML += ` <a href="tel:${store.properties.Website}"><img src = "https://www.freeiconspng.com/uploads/phone-png-3.png" width = "25" height = "25"></a>`;
        }

        link.addEventListener("click", function () {
          for (const feature of stores.features) {
            if (this.id === `link-${feature.properties.id}`) {
              flyToStore(feature);
              createPopUp(feature);
            }
          }
          const activeItem = document.getElementsByClassName("active");
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          this.parentNode.classList.add("active");
        });
      }
    }

    function getBbox(sortedStores, storeIdentifier, searchResult) {
      const lats = [
        sortedStores.features[storeIdentifier].geometry.coordinates[1],
        searchResult.coordinates[1],
      ];
      const lons = [
        sortedStores.features[storeIdentifier].geometry.coordinates[0],
        searchResult.coordinates[0],
      ];
      const sortedLons = lons.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      const sortedLats = lats.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      return [
        [sortedLons[0], sortedLats[0]],
        [sortedLons[1], sortedLats[1]],
      ];
    }

    map.on("idle", () => {
      // console.log(covid);
      if (
        !map.getLayer("Hospitalizations") ||
        !map.getLayer("Positive Cases") ||
        !map.getLayer("Deaths")
      ) {
        return;
      }

      const toggleableLayerIds = [
        "Hospitalizations",
        "Positive Cases",
        "Deaths",
      ];

      for (const id of toggleableLayerIds) {
        if (document.getElementById(id)) {
          continue;
        }

        const link = document.createElement("a");
        link.id = id;
        link.href = "#";
        link.textContent = id;
        link.className = "";

        link.onclick = function (e) {
          const clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.getLayoutProperty(clickedLayer, "visibility");
          if (layers.children[clickedLayer].className === "") {
            for (var i = 0; i < toggleableLayerIds.length; i++) {
              if (clickedLayer === toggleableLayerIds[i]) {
                layers.children[i].className = "active";
                map.setLayoutProperty(
                  toggleableLayerIds[i],
                  "visibility",
                  "visible"
                );
              } else {
                layers.children[i].className = "";
                map.setLayoutProperty(
                  toggleableLayerIds[i],
                  "visibility",
                  "none"
                );
              }
            }
          } else if (layers.children[clickedLayer].className === "active") {
            layers.children[clickedLayer].className = "";
            map.setLayoutProperty(clickedLayer, "visibility", "none");
          }
        };

        const layers = document.getElementById("menu");
        layers.appendChild(link);
      }
    });

    // map.on("mousemove", (event) => {
    //   const zipData = map.queryRenderedFeatures(event.point, {
    //     layers: ["Hospitalizations", "Positive Cases", "Deaths"],
    //   });

    //   document.getElementById("pd").innerHTML = zipData.length
    //     ? `<h3>${zipData[0].properties.ZIP}</h3>`
    //     : `<p>Click on a layer and hover over a zip code</p>`;
    // });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;