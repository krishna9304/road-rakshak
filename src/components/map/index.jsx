import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { MAPBOX_API_KEY } from "../../constants";

function Map() {
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    width: "100%",
    height: "100%",
  });
  const [center, setCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setViewport((v) => ({
        ...v,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
    });
    return () => {};
  }, []);

  return (
    <div className={`w-full h-96 w-96 border-2 border-black`}>
      <ReactMapGL
        onClick={(e) => {
          setCenter([e.lngLat[0], e.lngLat[1]]);
        }}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        {...viewport}
        onViewportChange={(nextView) => setViewport(nextView)}
      >
        <Marker latitude={center.latitude} longitude={center.longitude}>
          <div
            className="text-2xl bg-blue-700 w-4 h-4 transform -translate-x-2 -translate-y-2 border rounded-full"
            style={{
              marginTop: -(viewport.zoom ** 2.9 / 100) / 2,
              marginLeft: -(viewport.zoom ** 2.9 / 100) / 2,
            }}
          ></div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default Map;
