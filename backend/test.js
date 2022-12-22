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
      pool.query('SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter ORDER BY loc_name', (error, results) => {
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

const getModerna = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name NOT LIKE '%Bivalent%' AND med_name LIKE '%Moderna%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPfizer = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name NOT LIKE '%Bivalent%' AND med_name LIKE '%Pfizer%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getJanssen = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name NOT LIKE '%Bivalent%' AND med_name LIKE '%Janssen%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getNovavax = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name NOT LIKE '%Bivalent%' AND med_name LIKE '%Novavax%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getModernaBiva = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name LIKE '%Bivalent%' AND med_name LIKE '%Moderna%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPfizerBiva = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT DISTINCT loc_name, loc_admin_street, loc_phone, loc_admin_city, loc_admin_state, loc_admin_zip, web_address, latitude, longitude FROM vaxcenter WHERE med_name LIKE '%Bivalent%' AND med_name LIKE '%Pfizer%'", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getExpress = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM mobiletest WHERE type LIKE '%Express%' ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getMobileTest = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM mobiletest WHERE type LIKE '%Mobile%' ORDER BY id ASC", (error, results) => {
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
    getVaxCenters,
    getModerna,
    getPfizer,
    getJanssen,
    getNovavax,
    getPfizerBiva,
    getModernaBiva,
    getExpress,
    getMobileTest,
};

//import db by -> const pool = require("./db");