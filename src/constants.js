const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  BACKEND_URL: isDev
    ? `http://localhost:8080/`
    : "https://road-rakshak-server.herokuapp.com/",
  MAPBOX_API_KEY:
    "pk.eyJ1Ijoic21hcnQ5MzA0IiwiYSI6ImNrdGNpODc2OTBkYTEyd21hNG9qaGZqN2kifQ.vBvhbBI_9cxXZdM_ENUfQA",
};
