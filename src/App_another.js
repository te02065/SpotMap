


/* MapComponent.js 없이 한 곳에서서
*/
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const places = [
  { id: 1, name: "남산 서울타워", type: "야경", lat: 37.5512, lng: 126.9882 },
  { id: 2, name: "한강 반포대교 무지개분수", type: "야경", lat: 37.5125, lng: 126.9955 },
  { id: 3, name: "부산 광안대교", type: "야경", lat: 35.1539, lng: 129.1187 },
  { id: 4, name: "서울숲", type: "무료", lat: 37.5445, lng: 127.0373 },
  { id: 5, name: "올림픽공원", type: "무료", lat: 37.5194, lng: 127.1254 }
];

export default function NightViewMap() {
  const [filter, setFilter] = useState("all");

  const filteredPlaces = filter === "all" ? places : places.filter(p => p.type === filter);

  return (
    <div className="w-full h-screen">
      <div className="absolute top-4 left-4 z-10 p-2 bg-white rounded shadow">
        <button onClick={() => setFilter("all")} className="mr-2">전체</button>
        <button onClick={() => setFilter("야경")} className="mr-2">야경</button>
        <button onClick={() => setFilter("무료")} className="mr-2">무료</button>
      </div>
      <MapContainer center={[37.5665, 126.9780]} zoom={12} className="leaflet-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredPlaces.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
