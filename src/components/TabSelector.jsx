export default function TabSelector({ activeTab, onChange }) {
    return (
      <div className="tabWrap">
        <button
          className={`tab-button ${activeTab === "findId" ? "active" : ""}`}
          onClick={() => onChange("findId")}
        >
          아이디 찾기
        </button>
        <button
          className={`tab-button ${activeTab === "findPw" ? "active" : ""}`}
          onClick={() => onChange("findPw")}
        >
          비밀번호 찾기
        </button>
      </div>
    );
  }