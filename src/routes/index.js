const client = require("../utils/Client");
const controllers = require("../controllers");
const { allBookedAppointments, confirmAppointment } = controllers.bookings;
const CircuitBreaker = require("opossum");

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again.
};

const circuits = {
  available: new CircuitBreaker(allBookedAppointments, options),
  confirm: new CircuitBreaker(confirmAppointment, options),
};
circuits.available.fallback(() =>
  JSON.stringify({
    message: "the service is currently unavailable please try again later.",
  })
);
circuits.confirm.fallback(() =>
  JSON.stringify({
    message: "the service is currently unavailable please try again later.",
  })
);

circuits.available.on("failure", () => console.log("availability failed"));
circuits.confirm.on("failure", () => console.log("confirm failed"));

const basePath = "api/bookings";
const responsePath = "api/gateway/bookings";

client.subscribe(basePath);
const topics = [
  { topic: "confirm", qos: 2 },
  { topic: "all", qos: 2 },
  { topic: "available", qos: 2 },
];
topics.forEach((route) => {
  client.subscribe(basePath + "/" + route.topic, { qos: route.qos });
});

client.on("message", (t, m) => {
  const msg = m.toString();
  const topic = t.replace(basePath + "/", "");
  client.emit(topic, msg);
});

client.on("confirm", async (m) => {
  const booking = await confirmAppointment(m);
  client.publish(responsePath + "/confirm", booking);
});

client.on("available", async (m) => {
  const result = await circuits.available.fire(m);
  client.publish(responsePath + "/available", result);
});


module.export = client;
