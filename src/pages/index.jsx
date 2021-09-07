import React, { useRef, useState } from "react";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { BACKEND_URL, MAPBOX_API_KEY } from "../constants";
import axios from "axios";
import { Marker } from "react-map-gl";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSelector } from "react-redux";

mapboxgl.accessToken = MAPBOX_API_KEY;

const Map = ({ currPos = { latitude: 0, longitude: 0 } }) => {
  const getHurdles = () => {
    const types = {};
    hurdles.forEach((h) => {
      if (!types[h.hurdleType]) {
        types[h.hurdleType] = 0;
      }
      types[h.hurdleType] += 1;
    });
    return types;
  };

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [viewport, setViewport] = useState({
    ...currPos,
    zoom: 16,
  });
  const [hurdles, setHurdles] = useState([]);
  const [destination, setDestination] = useState({});

  const directions = useRef(null);
  const { speak, voices } = useSpeechSynthesis();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.longitude || 0, viewport.latitude || 0],
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
    let interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lastZoom = map.current.getZoom();
        const center = [pos.coords.longitude, pos.coords.latitude];
        directions.current.setOrigin(center);
        setTimeout(() => {
          map.current.setZoom(lastZoom);
        }, 0);
      }, console.error);
    }, 3000);
    directions.current.on("destination", () => {
      if (!hurdles.length) {
        axios.post(`${BACKEND_URL}api/v1/report/getverified`).then((res) => {
          if (res.data.res) {
            setHurdles(() => {
              return res.data.reports.map((hurdle) => {
                const container = document.createElement("div");
                container.classList.add("h-8");
                container.classList.add("w-8");
                container.classList.add("bg-red-500");
                container.classList.add("rounded-full");
                let m = new mapboxgl.Marker(container)
                  .setLngLat([
                    hurdle.locationCoords.longitude,
                    hurdle.locationCoords.latitude,
                  ])
                  .addTo(map.current);
                return hurdle;
              });
            });
          }
        });
      }
    });
    return () => {
      map.current.remove();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          onClick={() => {
            speak({
              text: `Hello, ${user.name}. There are total ${
                hurdles.length
              } hurdles on the way.\
              ${(() => {
                const types = getHurdles();
                let finalString = "";
                let i = 0;
                for (let key in types) {
                  finalString +=
                    types[key] +
                    " " +
                    key +
                    (types[key] === 1 ? "" : "s") +
                    (i === Object.keys(types).length - 1 ? "" : ", and ");
                  i++;
                }
                console.log(finalString);
                return finalString;
              })()}`,
              voice: voices[2],
            });
            console.log(getHurdles());
          }}
          className="w-1/2 md:w-1/3 bg-blue-600 text-white h-10 flex justify-center items-center rounded-3xl font-bold shadow-lg hover:bg-blue-800 cursor-pointer select-none"
        >
          Start Navigation
        </div>
      </div>
    </div>
  );
};

export default Map;
