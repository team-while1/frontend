export default function SubmitButton({ onClick, disabled, label = "확인" }) {
    return (
      <div>
        <button onClick={onClick} disabled={disabled} className="bottomButton">
          {label}
        </button>
      </div>
    );
  }