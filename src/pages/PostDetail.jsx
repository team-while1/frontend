import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/PostDetail.css';
import CommentSection from "../components/CommentSection";

function PostDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    post_id,   
    title,
    author,
    content,
    period,
    imageUrl
  } = state || {};

  if (!state) return <p>잘못된 접근입니다.</p>;

  const memberId = localStorage.getItem('member_id') || 1; // test용

  return (
    <div className="post-detail-layout">
      <div className="post-main">
        <div className="post-content-area">
          <div className="post-label">🎓 동아리 모집</div>
          <h1 className="post-title">{title}</h1>
          <p className="post-meta">작성자: {author} | 모집 기간: {period}</p>

          <div className="post-content">
            <h3>📢 모집 상세 안내</h3>
            <p className="post-body">{content}</p>
            {imageUrl && (
              <img src={imageUrl} alt="포스터" className="post-inline-image" />
            )}
          </div>

          <div className="post-comment-section">
            <CommentSection postId={post_id} memberId={memberId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;