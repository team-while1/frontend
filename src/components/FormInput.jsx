export default function FormInput({ type = "text", placeholder, value, onChange, autoFocus }) {
    return (
      <div className="inputWrap">
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      </div>
    );
  }