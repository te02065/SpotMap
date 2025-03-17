/* MapComponent.js 사용하는 코드
*/
import React, { useState } from "react";
import MapComponent from "./MapComponent";

function App() {
  const [filter, setFilter] = useState("전체");

  return (
    <div>
      <h1>대한민국 테마 지도</h1>
      <div>
        <button onClick={() => setFilter("전체")}>전체</button>
        <button onClick={() => setFilter("야경")}>야경</button>
        <button onClick={() => setFilter("무료")}>무료</button>
      </div>
      <MapComponent filter={filter} />
    </div>
  );
}

export default App;
