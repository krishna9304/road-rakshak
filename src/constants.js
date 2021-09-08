const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  BACKEND_URL: isDev
    ? `http://localhost:8080/`
    : "https://road-rakshak-server.herokuapp.com/",
  MAPBOX_API_KEY:
    "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg",
};
