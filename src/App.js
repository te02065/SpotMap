/* main
*/
import React, { useState, useRef } from "react";
import MapComponent from "./MapComponent";
import './App.css';

function App() {
  const [filter, setFilter] = useState("전체");
  // const filters = ["전체", "야경", "무료", "시티투어 정류장", "공공주택", "테스트"];
  const filters = ["전체", "무료", "야경"];
  const containerRef = useRef(null); // 필터 버튼 색

  return (
    <div className="app-container">  {/* 🌟 전체 컨테이너 추가 */}
      {/* 제목 */}
      <h1 className="h1Style">Spot Map (테마 지도)</h1> 
      
      {/* 필터 바 */}
      <div className="filter-container" ref={containerRef}>
        {filters.map((item) => (
            <button
                key={item}z
                className={`filter-button ${filter === item ? 'active' : ''}`}
                onClick={() => setFilter(item)}
            >
              {item}
            </button>
        ))}
      </div>
      
      {/* 지도 컴포넌트 */}
      <div className="map-container">  
        <MapComponent filter={filter} />
      </div>

      {/* 하단 배너 (공지 영역) */}
      <footer className="footer-banner">
        {/* <p>📩 문의: example@email.com | © 2025 Spot Map | 📸 인스타: @spotmap_official</p> */}
        <p>📩 Contact: IG DM | 📸 IG: @spotmap_official</p>
        {/* <p> V0 </p> 작업할 때마다 수정*/}
      </footer>
    </div>
  );
}

export default App;
