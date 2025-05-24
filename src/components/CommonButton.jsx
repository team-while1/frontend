// src/components/CommonButton.jsx
import './CommonButton.css';

export default function CommonButton({ children, onClick, type = 'primary', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`common-button ${type} ${className}`}
    >
      {children}
    </button>
  );
}