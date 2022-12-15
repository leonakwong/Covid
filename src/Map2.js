import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import geoJson from "./testCenters2.json";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
import covid from "./covidData2.json";
import Papa from "papaparse";
import { useParams } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXRoYW5sYXZpbnNreTQ2IiwiYSI6ImNsOWZ4YzI5dTBkbnkzdm14ZGlwbzUwbTgifQ.jByzOogEAXnVPymbyXjj-Q";

const stores = geoJson;

stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

// Papa.parse(
//   "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/hosp_death_last28days-by-modzcta.csv",
//   {
//     download: true,
//     header: true,
//     complete: function (results) {
//       console.log(reuslts);
//     },
//   }
// );

// let testy = [];

// const csvData = Papa.parse(
//   "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/hosp_death_last28days-by-modzcta.csv",
//   {
//     download: true,
//     header: true,
//     complete: function (data) {
//       results = data;
//     },
//   }
// );

// let testy = [];

// function doStuff(teste) {
//   //Data is usable here
//   // console.log(teste);
//   for (let i = 0; i < teste.length; i++) {
//     testy.push({
//       code: teste[i].ZIP.toString(),
//       hdi: teste[i].hospitalization_count_28day,
//     });
//   }
// }

// function parseData(url, callBack) {
//   Papa.parse(url, {
//     header: true,
//     download: true,
//     header: true,
//     complete: function (results) {
//       callBack(results.data);
//     },
//   });
// }

// parseData(
//   "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/hosp_death_last28days-by-modzcta.csv",
//   doStuff
// );

// console.log(testy);

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
let zipInput = 10065;
let zip;

for (let i = 0; i < zips.length; i++) {
  if (zipInput == zips[i]) {
    zip = i;
  }
}

let data = [];
let data2 = [];
let data3 = [];

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
// console.log(data);

const Map = () => {
  const params = useParams();
  const zipcode = params.zipcode;
  if (typeof zipcode === "string" && zipcode.trim().length !== 0) {
    console.log(zipcode);
    const zipNum = Number(zipcode);
    console.log(zipNum);
    for (let i = 0; i < zips.length; i++) {
      if (zipNum === zips[i]) {
        zip = i;
      }
    }
  }
  var middle = [covid[zip].lon, covid[zip].lat];
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ethanlavinsky46/cla93j7p1000j14pa6sblzm26",
      center: middle,
      zoom: 15,
    });

    // disable map rotation using right click + drag
    map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    // const data = [
    //   { code: "10002", hdi: 0.811 },
    //   { code: "10001", hdi: 0.816 },
    //   { code: "10009", hdi: 0.787 },
    // ];

    map.on("load", () => {
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        for (const marker of stores.features) {
          /* Create a div element for the marker. */
          const el = document.createElement("div");
          /* Assign a unique `id` to the marker. */
          el.id = `marker-${marker.properties.id}`;
          /* Assign the `marker` class to each marker for styling. */
          el.className = "marker";

          el.addEventListener("click", (e) => {
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
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

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
           **/
          // new mapboxgl.Marker() //default marker style
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
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Use the geocoder's default marker style
        bbox: [-75.063812, 40.336768, -72.977783, 41.121429], // Set the bounding box coordinates
      });

      // map.addControl(geocoder, "top-left");

      addMarkers();

      map.addSource("zips", {
        type: "vector",
        url: "mapbox://ethanlavinsky46.c5dqzdw0",
      });

      // Build a GL match expression that defines the color for every vector tile feature
      // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
      const matchExpression = ["match", ["get", "ZIP"]];
      const matchExpression2 = ["match", ["get", "ZIP"]];
      const matchExpression3 = ["match", ["get", "ZIP"]];

      // Calculate color values for each country based on 'hdi' value
      for (const row of data) {
        // Convert the range of data values to a suitable color
        const green = (row["hosp"] / 50) * 255;
        const color = `rgb(0, ${green}, 0)`;

        matchExpression.push(row["code"], color);
      }

      // Last value is the default, used where there is no data
      matchExpression.push("rgba(0, 0, 0, 0)");

      // Calculate color values for each country based on 'hdi' value
      for (const row of data2) {
        // Convert the range of data values to a suitable color
        const red = (row["pos"] / 130) * 255;
        const color2 = `rgb( ${red},0, 0)`;

        matchExpression2.push(row["code"], color2);
      }

      // Last value is the default, used where there is no data
      matchExpression2.push("rgba(0, 0, 0, 0)");

      // Calculate color values for each country based on 'hdi' value
      for (const row of data3) {
        // Convert the range of data values to a suitable color
        const blue = (row["death"] / 9) * 255;
        const color2 = `rgb( 0,0, ${blue})`;

        matchExpression3.push(row["code"], color2);
      }

      // Last value is the default, used where there is no data
      matchExpression3.push("rgba(0, 0, 0, 0)");

      // map.addLayer({
      //   id: "zip-fill-test",
      //   type: "fill",
      //   source: "zips",
      //   "source-layer": "nyc-zip-code-7b06h0",
      //   paint: {
      //     "fill-color": "#FFF",
      //     "fill-opacity": 0.5,
      //   },
      // });

      map.addLayer(
        {
          id: "hospFill",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            // make layer invisible by default
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
          id: "posFill",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            // make layer invisible by default
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
          id: "deathFill",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            // make layer invisible by default
            visibility: "none",
          },
          paint: {
            "fill-color": matchExpression3,
            "fill-opacity": 0.5,
          },
        },
        "admin-1-boundary-bg"
      );

      map.addLayer(
        {
          id: "N/A",
          type: "fill",
          source: "zips",
          "source-layer": "nyc-zip-code-7b06h0",
          layout: {
            // make layer invisible by default
            visibility: "none",
          },
          paint: {
            "fill-color": matchExpression3,
            "fill-opacity": 0,
          },
        },
        "admin-1-boundary-bg"
      );

      // map.addLayer({
      //   id: "zip-lines",
      //   type: "line",
      //   source: "zips",
      //   "source-layer": "nyc-zip-code-7b06h0",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "#ff69b4",
      //     "line-width": 1,
      //   },
      // });

      map.on("click", (event) => {
        /* Determine if a feature in the "locations" layer exists at that point. */
        const features = map.queryRenderedFeatures(event.point, {
          layers: ["locations"],
        });

        /* If it does not exist, return */
        if (!features.length) return;

        const clickedPoint = features[0];

        /* Fly to the point */
        flyToStore(clickedPoint);

        /* Close all other popups and display popup for clicked store */
        createPopUp(clickedPoint);

        /* Highlight listing in sidebar (and remove highlight for all other listings) */
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

      function fisrt() {}

      // geocoder.on("result", (event) => {
      const searchResult = middle;
      // const searchResult = event.result.geometry;
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
        return 0; // a must be equal to b
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
      // });
    });

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15.5,
      });
    }

    function createPopUp(currentFeature) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();

      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          `<h3><a href = "${currentFeature.Web}">${currentFeature.properties.Name}</a></h3><h4>${currentFeature.properties.Address}</h4><h4>${currentFeature.properties.Hours}</h4>`
        )
        .addTo(map);
    }

    function buildLocationList(stores) {
      for (const store of stores.features) {
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById("listings");
        const listing = listings.appendChild(document.createElement("div"));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = "item";

        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        link.className = "title";
        link.id = `link-${store.properties.id}`;
        link.innerHTML = `${store.properties.Name}`;

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement("div"));
        // details.innerHTML = `${store.properties.Borough}`;
        if (store.properties.Hours) {
          details.innerHTML += `  ${store.properties.Hours}`;
        }
        if (store.properties.distance) {
          const roundedDistance =
            Math.round(store.properties.distance * 100) / 100;
          details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }
        if (store.Web) {
          details.innerHTML += `<a href=" ${store.Web}"><img src="https://toppng.com/uploads/preview/web-png-jpg-transparent-stock-website-icon-blue-11563644926reanjnmk6x.png" width = "25" height = "25"></a>`;
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

    // After the last frame rendered before the map enters an "idle" state.
    map.on("idle", () => {
      // If these two layers were not added to the map, abort
      if (
        !map.getLayer("hospFill") ||
        !map.getLayer("posFill") ||
        !map.getLayer("deathFill")
      ) {
        return;
      }

      // Enumerate ids of the layers.
      const toggleableLayerIds = ["hospFill", "posFill", "deathFill"];

      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
          continue;
        }

        // Create a link.
        const link = document.createElement("a");
        link.id = id;
        link.href = "#";
        link.textContent = id;
        link.className = "";

        // Show or hide layer when the toggle is clicked.
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

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;