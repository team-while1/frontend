import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateMeeting.css';

export default function CreateMeeting() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('club');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creator, setCreator] = useState('');
  const [target, setTarget] = useState(5); // 🎯 목표 인원 추가
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !creator || !target) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const newMeeting = {
      title,
      description,
      category,
      creator,
      target: parseInt(target),
      image: image || '', // 선택 사항
      participants: []
    };

    const stored = JSON.parse(localStorage.getItem('meetings')) || [];
    localStorage.setItem('meetings', JSON.stringify([...stored, newMeeting]));

    alert('모임이 생성되었습니다.');
    navigate(`/${category}`);
  };

  return (
    <div className="create-page">
      <h2>모임 생성</h2>

      <label>카테고리</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="club">동아리</option>
        <option value="study">스터디·비교과</option>
        <option value="competition">공모전</option>
        <option value="etc">기타</option>
      </select>

      <label>모임 제목</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="모임 제목을 입력하세요"
      />

      <label>모임 설명</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="모임 설명을 입력하세요"
      />

      <label>개설자 이름</label>
      <input
        type="text"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        placeholder="예: 홍길동"
      />

      <label>목표 인원</label>
      <input
        type="number"
        min="1"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="예: 10"
      />

      <label>이미지 URL (선택)</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="http://example.com/image.jpg"
      />

      <button className="create-button" onClick={handleSubmit}>등록</button>
    </div>
  );
}