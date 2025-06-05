export default function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  autoFocus = false,
  label,
  error,
}) {
  return (
    <div className="inputWrap">
      {label && <label className="inputLabel">{label}</label>}
      {type === "textarea" ? (
        <textarea
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      ) : (
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}