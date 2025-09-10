import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const socket = io("http://localhost:5000");

function App() {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    // Konum dinle
    socket.on("receiveLocation", (data) => {
      setLocations((prev) => ({ ...prev, [data.id]: data }));
    });
  }, []);

  return (
    <MapContainer center={[39.9255, 32.8663]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(locations).map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]}>
          <Popup>{loc.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
