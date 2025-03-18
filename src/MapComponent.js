import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import { db, collection, getDocs } from "./firebase"; // Firestore 불러오기
import { db, collection, getDocs, doc, getDoc } from "./firebase"; // Firestore 관련 함수 가져오기
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const defaultIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", // 기본 아이콘
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    });

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684809.png", // 파란색 사용자 위치 아이콘
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    });


// 사용자의 현재 위치를 지도 중심으로 이동하는 컴포넌트
const LocateUser = ({ setUserLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("현재 위치를 가져올 수 없습니다.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            map.setView([latitude, longitude], 14); // 현재 위치로 지도 이동
            },
        () => {
            alert("위치 정보를 가져오지 못했습니다.");
        }
        );
    }, [map, setUserLocation]);

    return null;
};


const MapComponent = ({ filter }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [places, setPlaces] = useState([]); // Firestore에서 가져올 데이터

    // 🔥 Firestore에서 데이터 가져오기
    useEffect(() => {
      const fetchPlaces = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, "places")); // Firestore에서 "places" 컬렉션 가져오기
          const placesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          }));
          setPlaces(placesData); // 상태 업데이트
      } catch (error) {
          console.error("데이터를 불러오는 중 오류 발생:", error);
      }
      };

      fetchPlaces();
  }, []);

    const filteredPlaces = filter === "전체" ? places : places.filter(place => place.type === filter);


    return (
    <MapContainer center={[37.5665, 126.9780]} zoom={12} className="leaflet-container">
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
        />

        <LocateUser setUserLocation={setUserLocation} />

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