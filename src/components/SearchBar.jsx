// src/components/SearchBar.jsx
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange, placeholder = "검색어를 입력하세요..." }) {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}