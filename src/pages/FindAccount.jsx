import useFindAccountForm from "../hooks/useFindAccountForm";
import styles from "./FindAccount.module.css";
import TabSelector from "../components/TabSelector";
import ResultMessage from "../components/ResultMessage";
import FormInput from "../components/FormInput";

export default function FindAccount() {
  const {
    activeTab,
    email,
    name,
    foundInfo,
    setEmail,
    setName,
    handleTabChange,
    handleSearch
  } = useFindAccountForm();

  return (
    <div className={styles.page}>
      <TabSelector activeTab={activeTab} onChange={handleTabChange} />

      <div className={styles.contentWrap}>
        <FormInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        {activeTab === "findPw" && (
          <FormInput
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>

      <button className={styles.bottomButton} onClick={handleSearch}>
        확인
      </button>

      {foundInfo && <ResultMessage message={foundInfo} />}
    </div>
  );
}