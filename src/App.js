import React, { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import makerPng from "./assests/camera1.png";
import planePng from "./assests/plane.png";
import "./style/marker.css";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 40.415812,
  lng: 71.005257,
};

const App = () => {
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const secondMarkerRef = useRef(null); // Separate ref for the second marker

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);
    const customIcon = L.icon({
      iconUrl: makerPng,
      iconAnchor: [16, 32],
      iconSize: [64, 64],
      className: draggable ? "marker-icon animate" : "marker-icon",
    });
    return (
      <>
        <Marker
          icon={customIcon}
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={[40.415812, 71.005257]}
          ref={secondMarkerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span>
          </Popup>
        </Marker>
      </>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "GrayText",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <MapContainer
        style={{
          width: "800px",
          height: "600px",
          backgroundColor: "GrayText",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        center={center}
        zoom={30}
        // scrollWheelZoom={false}
        // dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <img src={planePng} alt="img" /> */}
        <DraggableMarker />
      </MapContainer>
    </div>
  );
};

export default App;
