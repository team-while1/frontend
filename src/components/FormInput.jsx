export default function FormInput({ type = "text", value, onChange, placeholder }) {
    return (
      <div className="inputWrap">
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }