const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5433,
    database: "projecthygieia"
});

const getHospitals = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM hospitals ORDER BY "ID" ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
}

const getVaxCenters = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM vaxcenter ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
}

const getTestCenters = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM mobiletest ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
}

module.exports = {
    getHospitals,
    getTestCenters,
    getVaxCenters
};

//import db by -> const pool = require("./db");