import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import geoJson from "./testCenters2.json";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXRoYW5sYXZpbnNreTQ2IiwiYSI6ImNsOWZ4YzI5dTBkbnkzdm14ZGlwbzUwbTgifQ.jByzOogEAXnVPymbyXjj-Q";

const stores = geoJson;

stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

const Map = () => {
  var middle = [-73.98, 40.73];
  const mapContainerRef = useRef(null);


function getCoordinates(address){
  fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token="+mapboxgl.accessToken)
    .then(response => response.json())
    .then(data => {
      console.log(data.features[0].center);
      middle = data.features[0].center;
    })
   
}
  const params = useParams();
  const zipcode = params.zipcode;
  if (typeof zipcode === 'string' && zipcode.trim().length !== 0) {
    getCoordinates(zipcode);
    console.log(middle);
}

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ethanlavinsky46/cla93j7p1000j14pa6sblzm26",
      center: middle,
      zoom: 12,
    });

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

      map.addControl(geocoder, "top-left");

      addMarkers();

      map.addSource("zips", {
        type: "vector",
        url: "mapbox://ethanlavinsky46.bozah4t4",
      });

      map.addLayer({
        id: "zip-fill-test",
        type: "fill",
        source: "zips",
        "source-layer": "nyu-2451-34509-geojson-58hf5f",
        paint: {
          "fill-color": "#FFF",
          "fill-opacity": 0.5,
        },
      });

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

      map.addLayer({
        id: "zip-lines",
        type: "line",
        source: "zips",
        "source-layer": "nyu-2451-34509-geojson-58hf5f",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff69b4",
          "line-width": 1,
        },
      });

      function fisrt() {}

      // geocoder.on("result", () => {
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
        zoom: 14,
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

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
