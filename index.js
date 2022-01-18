require('dotenv').config()
require('./src/routes')
const db = require("./src/utils/DB");

const populateClinics = require("./src/utils/populateClinics");

const refreshClinics = async () => {
  db.connection.db.dropCollection("clinics", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      populateClinics();
    }
  });
}

setInterval(refreshClinics, 60000);
