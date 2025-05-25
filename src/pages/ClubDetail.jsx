import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/ClubDetail.css';

function ClubDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { title, author, content, period, imageUrl } = state || {};

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, comment]);
    setComment('');
  };

  if (!state) return <p>잘못된 접근입니다.</p>;

  return (
    <>
      <div className="club-detail-layout">
        <div className="club-main">
          <div className="club-content-area">
            <div className="club-label">🎓 동아리 모집</div>
            <h1 className="club-title">{title}</h1>
            <p className="club-meta">작성자: {author} | 모집 기간: {period}</p>

            <div className="club-content">
              <h3>📢 모집 상세 안내</h3>
              <p className="club-body">{content}</p>

              {imageUrl && (
                <img src={imageUrl} alt="포스터" className="club-inline-image" />
              )}
            </div>

            <div className="club-comment-box">
              <textarea
                placeholder="댓글을 입력하세요..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleAddComment}>등록</button>
            </div>

            {comments.length > 0 && (
              <div className="club-comment-list">
                <h4>댓글 {comments.length}개</h4>
                <ul>
                  {comments.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubDetail;