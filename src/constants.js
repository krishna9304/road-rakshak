const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  BACKEND_URL: isDev
    ? `http://localhost:8080/`
    : "https://road-rakshak-server.herokuapp.com/",
  MAPBOX_API_KEY:
    "pk.eyJ1Ijoicm9hZHJha3NoYWsiLCJhIjoiY2t0Y2p5bWo0MGRnbjJxbzVmbHowb3RyaSJ9.zvpmBw1__ZKPtLoq2FW37Q",
};
