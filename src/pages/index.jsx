import React, { useRef, useState } from "react";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { MAPBOX_API_KEY } from "../constants";

mapboxgl.accessToken = MAPBOX_API_KEY;

const Map = ({ currPos = { latitude: 0, longitude: 0 } }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [viewport, setViewport] = useState({
    ...currPos,
    zoom: 16,
  });

  const [destination, setDestination] = useState({});

  const directions = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    });
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      interactive: false,
      controls: {
        instructions: false,
      },
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-left");
    map.current.addControl(directions.current, "top-right");
    map.current.on("move", () => {
      const pos = map.current.getCenter();
      setViewport((v) => ({
        ...v,
        latitude: pos.lat,
        longitude: pos.lon,
      }));
    });
    map.current.on("zoom", () => {
      const zoom = map.current.getZoom();
      setViewport((v) => ({
        ...v,
        zoom,
      }));
    });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        directions.current.setOrigin([
          pos.coords.longitude,
          pos.coords.latitude,
        ]);
      },
      console.error,
      { enableHighAccuracy: true }
    );
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lastZoom = map.current.getZoom();
        const center = [pos.coords.longitude, pos.coords.latitude];
        directions.current.setOrigin(center);
        setTimeout(() => {
          map.current.setZoom(lastZoom);
        }, 0);
      }, console.error);
      if (directions.current) {
        const dest = directions.current.getDestination();

        setDestination((d) => {
          if (typeof d.geometry !== "undefined") {
            if (
              dest.geometry.coordinates[0] === d.geometry.coordinates[0] &&
              dest.geometry.coordinates[1] === d.geometry.coordinates[1]
            ) {
              map.current.setPitch(60);
            }
          }
          return dest;
        });
      }
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <div
        style={{
          height: "70vh",
        }}
        ref={mapContainer}
        className="mapContainer select-none h-full flex"
      />
      <div
        style={{
          height: "10vh",
        }}
        className="w-full flex justify-center items-center"
      >
        <div className="w-1/2 md:w-1/3 bg-blue-600 text-white h-10 flex justify-center items-center rounded-3xl font-bold shadow-lg hover:bg-blue-800 cursor-pointer select-none">
          Start Navigation
        </div>
      </div>
    </div>
  );
};

export default Map;
