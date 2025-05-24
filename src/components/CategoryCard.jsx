import "./CategoryCard.css";
import megaphoneImg from "../assets/확성기.jpg";

export default function CategoryCard({ meeting, onClick }) {
  const participantCount = meeting.participants?.length || 0;
  const targetCount = meeting.target || 10;
  const percentage = Math.min((participantCount / targetCount) * 100, 100);

  return (
    <div className="category-card" onClick={onClick}>
      <img
        src={meeting.image || megaphoneImg}
        alt="모임 이미지"
        className="card-image"
      />
      <div className="card-content">
        <strong>{meeting.title}</strong>
        <p>{meeting.description}</p>
        <small>개설자: {meeting.creator}</small>
      </div>
      <div className="gauge-container">
        <div
          className="gauge-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="gauge-label">
        {participantCount} / {targetCount} 명 모집
      </div>
    </div>
  );
}
