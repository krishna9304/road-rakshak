const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  BACKEND_URL: isDev
    ? `http://localhost:8080/`
    : process.env.REACT_APP_BACKEND_URL,
  MAPBOX_API_KEY: process.env.REACT_APP_MAPBOX_API_KEY,
};
