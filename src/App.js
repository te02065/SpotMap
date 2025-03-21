/* main
*/
import React, { useState, useRef } from "react";
import MapComponent from "./MapComponent";
import './App.css';

function App() {
  const [filter, setFilter] = useState("전체");
  const filters = ["전체", "야경", "무료", "산책", "전망대", "테스트", "테스트테스트테스트", "테스트"];
  const containerRef = useRef(null); // 색색

  return (
    <div>
      {/* 제목 */}
      <h1 className="h1Style">Spot Map (테마 지도)</h1> {/* App.css style */}
      
      {/* 필터 바  */}
      <div
                className="filter-container"
                ref={containerRef}
            >
                {filters.map((item) => (
                    <button
                        key={item}
                        className={`filter-button ${filter === item ? 'active' : ''}`}
                        onClick={() => setFilter(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

      {/* 지도 컴포넌트 */}
      <MapComponent filter={filter} />
    </div>
  );
}

export default App;
