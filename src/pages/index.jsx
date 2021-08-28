import { useEffect, useState } from "react";
import { FullscreenControl, Marker, ScaleControl } from "react-map-gl";
import Mapbox from "react-map-gl";

const Map = () => {
  const [target, setTarget] = useState({
    latitude: 0,
    longitude: 0,
  });
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
    pitch: 60,
  });
  useEffect(() => {
    window.addEventListener("deviceorientationabsolute", handler, true);
    function handler(e) {
      let degToNorth = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      console.log(degToNorth);
      setViewport((v) => ({
        ...v,
        bearing: degToNorth,
      }));
    }
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setTarget({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setViewport((v) => ({
            ...v,
            pitch: v.zoom * 4,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
          // socket.emit("log", {
          //   latitude: pos.coords.latitude,
          //   longitude: pos.coords.longitude,
          // });
        },
        console.error,
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );
    }, 100);
    // eslint-disable-next-line
  }, []);

  return (
    <Mapbox
      width={size.width}
      height={size.height}
      mapStyle="mapbox://styles/not-valid/ckslvv1eudbjl17pjfkr59qn0" //decimal
      // mapStyle={"mapbox://styles/not-valid/ckslwn5xz29oc17lwznn465cl"} // blueprint
      onViewportChange={(v) => {
        setViewport({
          ...v,
          pitch: v.zoom * 4,
        });
      }}
      {...viewport}
      mapboxApiAccessToken={
        "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
      }
      //  mapbox gives you an access token when you create an account
      //  so don't use this for your project go get one for free.
    >
      <FullscreenControl className="right-4 bottom-4" />
      <ScaleControl className="text-lg font-bold" />
      <Marker latitude={target.latitude} longitude={target.longitude}>
        <div
          style={{
            transform: `translateX(-${
              viewport.zoom * 2 < 10 ? 8 : viewport.zoom * 2
            }px) translateY(-${
              viewport.zoom * 2 < 10 ? 8 : viewport.zoom * 2
            }px) rotateX(${viewport.zoom * 4}deg)`,
          }}
        >
          <div
            style={{
              // transform: `rotateX(${viewport.pitch}deg);`,
              padding: viewport.zoom * 0.5 < 10 ? 8 : viewport.zoom * 0.5,
            }}
            className="border-4 border-white rounded-full"
          >
            <div
              style={{
                padding: viewport.zoom < 10 ? 8 : viewport.zoom,
              }}
              className="border-2 border-black bg-green-500 rounded-full"
            />
          </div>
        </div>
      </Marker>
    </Mapbox>
  );
};

export default Map;
