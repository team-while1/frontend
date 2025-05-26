export default function BottomLinkButtons({ onSignUp, onFind }) {
    return (
      <div className="find">
        <button onClick={onSignUp}>회원가입</button>
        <button onClick={onFind}>아이디/비밀번호 찾기</button>
      </div>
    );
  }