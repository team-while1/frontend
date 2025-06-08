import "./CategoryCard.css";
import megaphoneImg from "../assets/empty_img.png";

export default function CategoryCard({ meeting, onClick }) {
  const participantCount = meeting.participants?.length || 0;
  const totalCount = meeting.total_slots || 10;
  const percentage = Math.min((participantCount / totalCount) * 100, 100);

  return (
    <div className="category-card" onClick={onClick}>
      <img
        src={meeting.image || megaphoneImg}
        alt="모임 이미지"
        className="card-image"
      />
      <div className="card-content">
        <strong>{meeting.title}</strong>
        <p>{meeting.content}</p> {/* ✅ description → content로 변경 */}
        <small>모집 기간: {meeting.start_date} ~ {meeting.end_date}</small> {/* ✅ 모집 기간 추가 */}
        <small>모집 인원: {totalCount}명</small> {/* ✅ 모집 인원 명시 */}
      </div>
      <div className="gauge-container">
        <div
          className="gauge-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="gauge-label">
        {participantCount} / {totalCount} 명 모집
      </div>
    </div>
  );
}