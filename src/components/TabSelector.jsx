import styles from "./TabSelector.module.css";

export default function TabSelector({ activeTab, onChange }) {
  return (
    <div className={styles.tabWrap}>
      <button
        className={`${styles.tabButton} ${activeTab === "findId" ? styles.active : ""}`}
        onClick={() => onChange("findId")}
      >
        아이디 찾기
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === "findPw" ? styles.active : ""}`}
        onClick={() => onChange("findPw")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}