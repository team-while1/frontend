import "./CategoryCard.css";
import megaphoneImg from "../assets/empty_img.png";

export default function CategoryCard({ meeting, onClick }) {
  const participantCount = meeting.participants?.length || 0;
  const totalCount = meeting.total_slots || 10;
  const percentage = Math.min((participantCount / totalCount) * 100, 100);

  console.log("🔥 writerName", meeting.writerName); // 왜 갑자기 게시자가 안 나올까
  return (
    <div className="category-card" onClick={onClick}>
      <img
        src={
          meeting.image ? `https://kunnect.co.kr/${meeting.image.replace(/^\/?/, "")}` : megaphoneImg
        }
        alt="모임 이미지"
        className="card-image"
      />
      <div className="card-content">
        <strong>{meeting.title}</strong>
        <p>{meeting.content}</p>
        {meeting.writerName && <small>개설자: {meeting.writerName}</small>}
        <p>
          모집 기간: {meeting.startDate} ~ {meeting.endDate}
        </p>
        <p>모집 인원: {meeting.totalSlots}명</p>
      </div>
      <div className="gauge-container">
        <div className="gauge-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="gauge-label">
        {participantCount} / {meeting.totalSlots} 명 모집
      </div>
    </div>
  );
}
