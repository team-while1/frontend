// src/pages/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import '../styles/PostDetail.css';
import CommentSection from "../components/CommentSection";
import axios from '../api/axiosInstance';
import { useUser } from '../contexts/UserContext';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import ApplicationManageModal from "../components/ApplicationManageModal";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const postRes = await axios.get(`/api/posts/${postId}`);
      setPost(postRes.data);
    } catch (err) {
      console.error('❌ 게시글 불러오기 실패:', err);
      setError('존재하지 않는 게시글이거나 잘못된 접근입니다.');
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="loading-message">로딩 중...</p>;

  const {
    id: post_id,
    title,
    content,
    views,
    startDate: start_date,
    endDate: end_date,
    totalSlots: total_slots,
    appliedCount,
    categoryId: category,
    createdAt: created_at,
    writerName,
    writerProfileUrl,
    writerId: post_author_id,
  } = post;

  const isFull = total_slots > 0 && appliedCount >= total_slots;
  const authorNickname = writerName || '알 수 없음';
  const authorProfileUrl = writerProfileUrl || "/anonymous.png";

  const categoryLabelMap = {
    club: '🎓 동아리 모집',
    study: '📚 스터디 모집',
    competition: '🏆 공모전 모집',
    etc: '✨ 기타 모집',
  };
  const categoryLabel = categoryLabelMap[category] || '📌 모임 모집';
  const isRecruiting = new Date() < new Date(end_date);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleApply = async () => {
    if (!user) {
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!post_id || !user?.member_id) {
      toast.error("신청에 필요한 정보가 누락되었습니다.");
      return;
    }

    if (new Date() >= new Date(end_date)) {
      toast.info('모집 기간이 종료되었습니다.');
      return;
    }

    if (isFull) {
      toast.warn("정원이 마감되었습니다.");
      return;
    }

    setIsApplying(true);
    try {
      await axios.post('/api/applications', {
        postId: post_id,
        comment: '참여 신청합니다.',
      });
      toast.success('참여 신청이 완료되었습니다!');
      await fetchPost();
    } catch (err) {
      const serverError = err.response?.data;
      const msg = serverError?.message || serverError?.error || '참여 신청에 실패했습니다.';
      toast.error(`참여 신청 실패: ${msg}`);
    } finally {
      setIsApplying(false);
    }
  };

  const progressBarWidth = total_slots > 0
    ? Math.min((appliedCount / total_slots) * 100, 100)
    : 0;

  return (
    <div className="post-detail-layout">
      <div className="post-main">
        <div className="post-content-area">
          <div className="post-header-top">
            <div className="post-label">{categoryLabel}</div>
          </div>

          <h1 className="post-title">{title}</h1>

          <div className="post-author-info">
            <img src={authorProfileUrl} alt="Profile" className="author-profile-pic" />
            <div className="author-details">
              <span className="author-nickname">{authorNickname}</span>
              <span className="post-date">작성일: {formatDate(created_at)}</span>
            </div>
          </div>

          <div className="post-summary-info">
            <div className="info-item">
              <strong><img src="/calender.png" alt="모집 기간" className="info-icon" /> 모집 기간:</strong>
              {formatDate(start_date)} ~ {formatDate(end_date)}
            </div>
            <div className="info-item">
              <strong><img src="/group.png" alt="정원" className="info-icon" /> 정원:</strong>
              {appliedCount || 0} / {total_slots}명
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${progressBarWidth}%` }}></div>
              </div>
            </div>
            <div className="info-item">
              <strong><img src="/view.png" alt="조회수" className="info-icon" /> 조회수:</strong>
              {views}
            </div>
          </div>

          <div className="post-content">
            <h3><img src="/news.png" alt="모집 안내" className="section-icon" /> 모집 상세 안내</h3>
            <div className="post-body">{parse(content)}</div>
          </div>

          <div className="post-actions">
            <div className="apply-button-container">
              {isRecruiting && !isFull ? (
                <button className="action-button apply-button" onClick={handleApply} disabled={isApplying}>
                  {isApplying ? '신청 중...' : '참여 신청하기'}
                </button>
              ) : (
                <button className="action-button disabled-button" disabled>
                  {isFull ? '정원 마감' : '모집 기간 종료'}
                </button>
              )}

              {/* 작성자일 경우 신청 관리 모달 띄우기 */}
              {user?.member_id === post?.memberId && (
                <button className="action-button edit" onClick={() => setShowManageModal(true)}>
                  신청 관리 보기
                </button>
              )}
            </div>
          </div>

          {showManageModal && (
            <ApplicationManageModal
              postId={post.id}
              onStatusChange={fetchPost}
              onClose={() => setShowManageModal(false)}
            />
          )}

          <div className="post-comment-section">
            {post_id && <CommentSection postId={post_id} postAuthorMemberId={post_author_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;