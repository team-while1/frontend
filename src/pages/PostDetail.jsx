// ✅ 게시글 상세 페이지 (PostDetail)
// 선택한 게시글에 대한 정보를 확인하고 댓글을 남길 수 있는 페이지입니다.

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/PostDetail.css';
import CommentSection from "../components/CommentSection";

function PostDetail() {
  // 📍 현재 페이지로 전달된 상태(state)에서 게시글 정보 추출
  const { state } = useLocation();
  const {
    post_id,
    title,
    author,
    content,
    period,
    imageUrl,
    memberId
  } = state || {};
  // 🔀 뒤로 가기 등 라우팅 제어용
  const navigate = useNavigate();

  // 🚫 잘못된 접근 방지: state 없이 접근할 경우 안내 메시지 출력
  if (!state) return <p>잘못된 접근입니다.</p>;


  // 💡 실제 렌더링 영역
  return (
    <div className="post-detail-layout">
      <div className="post-main">
        <div className="post-content-area">
          <div className="post-label">🎓 동아리 모집</div>
          <h1 className="post-title">{title}</h1>
          <p className="post-meta">작성자: {author} | 모집 기간: {period}</p>

          <div className="post-content">
            {/* 📋 게시글 본문 내용 표시 */}
            <h3>📢 모집 상세 안내</h3>
            <p className="post-body">{content}</p>
            {imageUrl && (
              <img src={imageUrl} alt="포스터" className="post-inline-image" />
            )}
          </div>

          <div className="post-comment-section">
            {/* 💬 댓글 섹션 (댓글 작성 및 목록) */}
            <CommentSection postId={post_id} memberId={memberId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;