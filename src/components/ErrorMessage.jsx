export default function ErrorMessage({ condition, message }) {
    if (!condition) return null;
  
    return (
      <div className="errorMessageWrap">
        <div>{message}</div>
      </div>
    );
  }