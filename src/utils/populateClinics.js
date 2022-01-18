const axios = require("axios");
const model = require("../models").clinics;

const clinic_uri =
  "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json";
const parseDate = (day) => {
  //'10:00-16:00'
  //console.log(day);
  const times = day.split("-");
  start = times[0].split(":");
  end = times[1].split(":");
  return {
    start: {
      hour: start[0],
      minute: start[1],
    },
    end: {
      hour: end[0],
      minute: end[1],
    },
  };
};

const getClinics = async () => {
  const res = await axios.get(clinic_uri);
  const { dentists } = res.data;
  dentists.forEach((clinic) => {
    //console.log(clinic)
    owner = clinic.owner.split(" ");
    model.create({
      name: clinic.name,
      owner: {
        first: owner[0],
        last: owner[1],
      },
      dentists: clinic.dentists,
      address: clinic.address,
      coordinate: {
        longitude: clinic.coordinate.longitude,
        latitude: clinic.coordinate.latitude,
      },
      openinghours: {
        monday: parseDate(clinic.openinghours.monday),
        tuesday: parseDate(clinic.openinghours.tuesday),
        wednesday: parseDate(clinic.openinghours.wednesday),
        thursday: parseDate(clinic.openinghours.thursday),
        friday: parseDate(clinic.openinghours.friday),
      },
    });
  });
};

module.exports = getClinics;
