import React from "react";
// 제목, 필터바 작업. 20250319

const FilterBar = ({ filters, selectedFilter, onSelectFilter }) => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex gap-2 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;