import React, {useState, useEffect} from 'react';

function GeoJson() {
    const [hospitals, setStores] = useState(false);
    useEffect(() => {
      getHospital();
    }, []);
    function getHospital() {
      fetch('http://localhost:6000/hospital')
        .then(response => {
          return response.text();
        })
        .then(data => {
          setStores(data);
        });
    };
}
export default GeoJson;

