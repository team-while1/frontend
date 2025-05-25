// src/components/FilterPanel.jsx
import "./FilterPanel.css";

export default function FilterPanel({ filters, setFilters }) {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleHoursChange = (e) => {
    const value = Number(e.target.value);
    setFilters((prev) => ({ ...prev, minHours: value }));
  };

  return (
    <div className="filter-panel">
      <label>
        <input
          type="checkbox"
          name="onlySupported"
          checked={filters.onlySupported}
          onChange={handleCheckbox}
        />
        지원금 있는 모임
      </label>

      <label>
        <input
          type="checkbox"
          name="onlyNotEnded"
          checked={filters.onlyNotEnded}
          onChange={handleCheckbox}
        />
        마감 전 모임
      </label>

      <label>
        최소 비교과 시간:
        <input
          className="hour-input"
          type="number"
          min={0}
          value={filters.minHours}
          onChange={handleHoursChange}
        />
        시간 이상
      </label>
    </div>
  );
}