import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../styles/MeetingDetail.css';

export default function MeetingDetail() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [meeting, setMeeting] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('meetings')) || [];
    const filtered = stored.filter((m) => m.category === category);
    const target = filtered[parseInt(id)];

    if (!target) {
      alert('해당 모임을 찾을 수 없습니다.');
      navigate(`/${category}`);
    } else {
      setMeeting(target);
      if (user && target.participants?.includes(user.name)) {
        setAlreadyJoined(true);
      }
    }
  }, [category, id, user, navigate]);

  const handleJoin = () => {
    const allMeetings = JSON.parse(localStorage.getItem('meetings')) || [];
    const categoryMeetings = allMeetings.filter((m) => m.category === category);
    const globalIndex = allMeetings.findIndex(
      (m) => m.category === category && categoryMeetings.indexOf(m) === parseInt(id)
    );

    const updatedMeeting = {
      ...meeting,
      participants: [...(meeting.participants || []), user.name],
    };

    allMeetings[globalIndex] = updatedMeeting;
    localStorage.setItem('meetings', JSON.stringify(allMeetings));
    setMeeting(updatedMeeting);
    setAlreadyJoined(true);
    alert('모임에 신청되었습니다.');
  };

  if (!meeting) return null;

  return (
    <div className="meeting-detail">
      <h2>{meeting.title}</h2>
      <p><strong>설명:</strong> {meeting.description}</p>
      <p><strong>개설자:</strong> {meeting.creator}</p>
      <p><strong>카테고리:</strong> {category}</p>

      {user && (
        <button
          onClick={handleJoin}
          disabled={alreadyJoined}
          className="join-button"
        >
          {alreadyJoined ? '신청 완료' : '신청하기'}
        </button>
      )}

      <div className="participants-section">
        <strong>참여자:</strong>
        <ul>
          {(meeting.participants || []).map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate(`/${category}`)} className="back-button">
        ← 목록으로
      </button>
    </div>
  );
}