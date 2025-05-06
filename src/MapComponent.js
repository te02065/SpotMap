import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { db, collection, getDocs } from "./firebase"; // Firestore 관련 함수 가져오기
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 기본 아이콘
const defaultIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

// 사용자 위치 아이콘
const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684809.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

// 현재 위치 버튼 컴포넌트 (지도 위 컨트롤에 추가)
const LocationButton = ({ setUserLocation }) => {
    const map = useMap();

    const handleLocate = () => {
        if (!navigator.geolocation) {
            alert("현재 위치를 가져올 수 없습니다.");
        return;
        }

        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            map.setView([latitude, longitude], 14);
        },
        () => {
            alert("위치 정보를 가져오지 못했습니다.");
        }
        );
    };

    useEffect(() => {
        const customControl = L.control({ position: "topleft" });

        customControl.onAdd = function (map) {
        const div = L.DomUtil.create("div", "leaflet-control custom-location-btn");
        div.innerHTML = "🎯"; // 과녁 아이콘
        div.onclick = handleLocate;
        return div;
        };

        customControl.addTo(map);

        return () => {
        map.removeControl(customControl);
        };
    }, [map]);

    return null;
};

const MapComponent = ({ filter }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                    const querySnapshot = await getDocs(collection(db, "places"));
                    const placesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPlaces(placesData);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchPlaces();
    }, []);

    const filteredPlaces =
        filter === "전체"
        ? places
        : places.filter((place) => place.type && place.type.includes(filter));

    return (
        <MapContainer center={[37.5665, 126.978]} zoom={12} className="leaflet-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

        <LocationButton setUserLocation={setUserLocation} />

        {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
            <Popup>📍 현재 위치</Popup>
            </Marker>
        )}

        {filteredPlaces.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={defaultIcon}>
            <Popup>
                <h3>{place.name}</h3>
                <p>📍 {place.type} 명소</p>
                <a href={`https://map.naver.com/p/search/${encodeURIComponent(place.name)}`} target="_blank" rel="noopener noreferrer">
                네이버 지도에서 보기
                </a>
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    );
};

export default MapComponent;
