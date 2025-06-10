import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/PostDetail.css';
import CommentSection from "../components/CommentSection"; 
import axios from '../api/axiosInstance'; 
import { useUser } from '../contexts/UserContext'; 
import parse from 'html-react-parser'; 

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); 
  const [post, setPost] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null); 
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false); 

  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      try {
        const postRes = await axios.get(`/api/posts/${postId}`);
        setPost(postRes.data);

        if (postRes.data.member_id) { 
          try {
            const authorRes = await axios.get(`/api/member/${postRes.data.member_id}`);
            setAuthorInfo(authorRes.data);
          } catch (authorErr) {
            console.error('❌ 작성자 정보 불러오기 실패:', authorErr);
            setAuthorInfo(null); 
          }
        } else {
          console.warn('게시글 응답에 작성자 member_id가 없습니다. 작성자 정보 표시가 제한됩니다.');
          setAuthorInfo(null);
        }

      } catch (err) {
        console.error('❌ 게시글 불러오기 실패:', err);
        setError('존재하지 않는 게시글이거나 잘못된 접근입니다.');
      }
    };

    fetchPostAndAuthor();
  }, [postId]); 


  const handleApply = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    if (!post) {
      alert('게시글 정보가 없습니다.');
      return;
    }
    if (new Date() >= new Date(post.end_date)) {
      alert('모집 기간이 종료되었습니다.');
      return;
    }

    setIsApplying(true);
    try {
      alert('참여 신청이 완료되었습니다!');
    } catch (err) {
      console.error('참여 신청 실패:', err);
      alert('참여 신청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleEdit = () => {
    if (!user || !post) {
      alert('수정 권한이 없습니다.');
      return;
    }
    if (user.member_id !== post.member_id) {
      alert('본인의 게시물만 수정할 수 있습니다.');
      return;
    }
    navigate(`/edit-post/${postId}`); // 게시물 수정 페이지로 이동
  };

  const handleDelete = async () => {
    if (!user || !post) {
      alert('삭제 권한이 없습니다.');
      return;
    }
    if (user.member_id !== post.member_id) {
      alert('본인의 게시물만 삭제할 수 있습니다.');
      return;
    }

    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/posts/${postId}`, { data: { member_id: user.member_id } });
        alert('게시물이 삭제되었습니다.');
        navigate('/posts'); 
      } catch (err) {
        console.error('게시물 삭제 실패:', err);
        alert(err.response?.data?.message || '게시물 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("유효하지 않은 날짜 문자열:", dateString);
      return '';
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="loading-message">로딩 중...</p>;

  if(!post.post_id){
    console.error("로드된 게시물 데이터에 post_id가 없습니다.");
    return <p className="error-message">게시물 데이터를 불러오는데 실패했습니다</p>
  }

  const {
    post_id,
    member_id, 
    title,
    content,
    views,
    start_date,
    end_date,
    total_slots,
    category,
  } = post;

  // ⭐ authorInfo에서 닉네임과 프로필 URL 가져오기
  const authorNickname = authorInfo ? authorInfo.name : `사용자 ${member_id || '알 수 없음'}`;
  const authorProfileUrl = authorInfo ? authorInfo.profile_url : "/images/profile/anonymous.png";
  
  const postCreatedAt = post.created_at; 

  // 카테고리 라벨 매핑
  const categoryLabelMap = {
    club: '🎓 동아리 모집',
    study: '📚 스터디 모집',
    competition: '🏆 공모전 모집',
    etc: '✨ 기타 모집',
  };
  const categoryLabel = categoryLabelMap[category] || '📌 모임 모집';

  // 작성자 여부 확인
  const isAuthor = user && user.member_id === member_id;

  const isRecruiting = new Date() < new Date(end_date);

  return (
    <div className="post-detail-layout">
      <div className="post-main">
        <div className="post-content-area">
          <div className="post-header-top">
            <div className="post-label">{categoryLabel}</div>
            {isAuthor && ( // 작성자에게만 보이는 수정/삭제 버튼
              <div className="author-actions">
                <button onClick={handleEdit} className="action-button edit">수정</button>
                <button onClick={handleDelete} className="action-button delete">삭제</button>
              </div>
            )}
          </div>

          <h1 className="post-title">{title}</h1>

          {/* 작성자 정보 섹션 */}
          <div className="post-author-info">
            <img
              src={authorProfileUrl}
              alt="Profile"
              className="author-profile-pic"
            />
            <div className="author-details">
              <span className="author-nickname">{authorNickname}</span>
              <span className="post-date">
                작성일: {postCreatedAt ? formatDate(postCreatedAt) : '날짜 정보 없음'}
              </span>
            </div>
          </div>

          {/* 주요 정보 요약 (모집 기간, 정원, 조회수) */}
          <div className="post-summary-info">
            <div className="info-item">
              <strong>🗓️ 모집 기간:</strong> {formatDate(start_date)} ~ {formatDate(end_date)}
            </div>
            <div className="info-item">
              <strong>👨‍👩‍👧‍👦 정원:</strong> 0 / {total_slots}명 {/* current_participants가 없으므로 0으로 고정 */}
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `0%` }} // 참여 인원 알 수 없으므로 0% 고정
                ></div>
              </div>
            </div>
            <div className="info-item">
              <strong>👁️ 조회수:</strong> {views}
            </div>
            {/* 좋아요 버튼 제거됨 */}
          </div>

          {/* 게시물 본문 */}
          <div className="post-content">
            <h3>📢 모집 상세 안내</h3>
            <div className="post-body">
              {parse(content)}
            </div>
          </div>

          {/* 참여/신청 버튼 */}
          <div className="post-actions">
            {isRecruiting ? (
              <button
                className="action-button apply-button"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? '신청 중...' : '참여 신청하기'}
              </button>
            ) : (
              <button className="action-button disabled-button" disabled>
                모집 기간 종료
              </button>
            )}
          </div>

          {/* 댓글 섹션 */}
          <div className="post-comment-section">
            {post_id &&(
            <CommentSection postId={post_id} memberId={member_id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;