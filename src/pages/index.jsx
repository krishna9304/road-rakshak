import React, { useRef, useState } from "react";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { BACKEND_URL, MAPBOX_API_KEY } from "../constants";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSelector } from "react-redux";

mapboxgl.accessToken = MAPBOX_API_KEY;

const Map = ({ currPos = { latitude: 0, longitude: 0 } }) => {
  const [ori, setOri] = useState([0, 0]);
  const [dest, setDest] = useState([0, 0]);

  const getHurdles = (hurdl) => {
    const types = {};
    hurdl.forEach((h) => {
      if (!types[h.hurdleType]) {
        types[h.hurdleType] = 0;
      }
      types[h.hurdleType] += 1;
    });
    return types;
  };

  const speech = (h) => {
    let text = `Hello, ${user.name}. There are total ${h.length} hurdle${
      h.length > 1 ? "s" : ""
    } on the way.\
      ${(() => {
        const types = getHurdles(h);
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
        return finalString;
      })()}`;
    return text;
  };

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [viewport, setViewport] = useState({
    ...currPos,
    zoom: 16,
  });

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
      interactive: true,
      controls: {
        instructions: false,
      },
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    map.current.addControl(directions.current, "bottom-left");
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
    navigator.geolocation.getCurrentPosition((pos) => {
      const center = [pos.coords.longitude, pos.coords.latitude];
      directions.current.setOrigin(center);
      let ele = document.createElement("div");
      ele.classList.add(
        "w-6",
        "h-6",
        "rounded-full",
        "bg-indigo-500",
        "border-2",
        "border-white"
      );
      new mapboxgl.Marker(ele).setLngLat(center).addTo(map.current);
    }, console.error);

    directions.current.on("origin", () => {
      setOri(directions.current.getOrigin().geometry.coordinates);
    });

    directions.current.on("destination", () => {
      const destination =
        directions.current.getDestination().geometry.coordinates;
      setDest(destination);
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${ori[0]},${ori[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${MAPBOX_API_KEY}`
        )
        .then((res1) => {
          if (res1.data.routes.length) {
            const coords = res1.data.routes[0].geometry.coordinates;
            axios
              .post(`${BACKEND_URL}api/v1/report/getverified`)
              .then((res2) => {
                if (res2.data.res) {
                  let h = res2.data.hurdles.map((hurdle) => {
                    const container = document.createElement("div");
                    container.classList.add("h-8");
                    container.classList.add("w-8");
                    container.classList.add("bg-red-500");
                    container.classList.add("rounded-full");
                    new mapboxgl.Marker(container)
                      .setLngLat([
                        hurdle.locationCoords.longitude,
                        hurdle.locationCoords.latitude,
                      ])
                      .addTo(map.current);
                    return hurdle;
                  });
                  let s = speech(h);
                  setTimeout(() => {
                    speak(s, voices[2]);
                  }, 300);
                }
              });
          } else {
            console.log("Route not found :-(");
          }
        });
    });

    return () => {
      map.current.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        height: "90vh",
      }}
    >
      <div
        style={{
          height: "80vh",
        }}
        ref={mapContainer}
        className="mapContainer select-none h-full flex"
      />
      <div className="w-full flex flex-col justify-center items-center my-8">
        <div className="hidden md:block">
          Please use a mobile device to start navigation!
        </div>
        <div className="hidden md:block">
          Also, make sure you have installed{" "}
          <a
            download
            href="https://drive.google.com/file/d/1ZHupW-cbnOJmXq0v55R0XaEZKUdQ9tzX/view?usp=sharing"
            className="underline font-semibold"
          >
            Road Rakshak
          </a>{" "}
          app.
        </div>
        <a
          href={`roadrakshak://app/map/${ori[0]},${ori[1]}/${dest[0]},${dest[1]}`}
          onClick={() => {}}
          className="w-1/2 md:hidden bg-blue-600 text-white h-10 flex justify-center items-center rounded-3xl font-bold shadow-lg hover:bg-blue-800 hover:text-white cursor-pointer select-none"
        >
          Start Navigation
        </a>
      </div>
    </div>
  );
};

export default Map;
