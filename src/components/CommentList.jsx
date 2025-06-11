import React, { useEffect, useState, useCallback } from "react";
import { getCommentByPostId } from "../api/comments";
import { useUser } from "../contexts/UserContext";
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

// refreshCount prop을 CommentList의 함수 인자에 추가합니다.
export default function CommentList({ postId, postAuthorMemberId, refreshCount }) { 
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContents, setEditContents] = useState({});

  // 댓글을 불러오는 함수를 useCallback으로 감싸서 메모이제이션
  // refreshCount가 변경될 때마다 이 함수가 재생성되고, useEffect가 이를 감지하여 다시 실행됩니다.
  const loadComments = useCallback(async () => {
    if (!postId) {
      setLoading(false);
      setComments([]);
      setError('게시물 ID가 유효하지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await getCommentByPostId(postId);
      const fetchedComments = res.data;

      const commentsWithAuthorInfo = fetchedComments.map((comment) => {
        // 백엔드 응답 필드명에 따라 'comment_id' 또는 'id'를 사용하도록 통일 (둘 중 하나만 오게 하는 것이 가장 좋음)
        const commentId = comment.comment_id || comment.id; 
        // 백엔드 응답 필드명에 따라 'created_at' 또는 'createdAt'을 사용하도록 통일
        const createdAt = comment.created_at || comment.createdAt;

        // 익명 여부에 따라 프로필 정보 설정
        let authorNickname = '익명';
        let profileUrl = '/anonymous.png';

        if (!comment.is_anonymous) {
            authorNickname = comment.writer_name || '이름 없음';
            profileUrl = comment.profile_url || '/anonymous.png';
        }

        return {
          ...comment,
          id: commentId, // 모든 댓글 객체에 'id' 필드로 통일하여 사용 (comment_id 대신)
          createdAt: createdAt, // 모든 댓글 객체에 'createdAt' 필드로 통일하여 사용
          authorNickname,
          profileUrl,
        };
      });

      setComments(commentsWithAuthorInfo);
    } catch (err) {
      setError('댓글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [postId, refreshCount]); // postId와 refreshCount가 변경될 때만 함수 재생성

  useEffect(() => {
    loadComments();
  }, [loadComments]); // loadComments가 변경될 때만 실행

  const formatCommentDate = (dateString) => {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '날짜 오류';

    const now = new Date();
    const diff = now - date;
    const min = Math.floor(diff / 60000);
    const hour = Math.floor(diff / 3600000);
    const day = Math.floor(diff / 86400000);

    if (min < 1) return '방금 전';
    if (min < 60) return `${min}분 전`;
    if (hour < 24) return `${hour}시간 전`;
    if (day < 7) return `${day}일 전`;

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditContents(prev => ({ ...prev, [commentId]: content }));
  };

  const saveEdit = async (comment) => {
    const commentId = comment.id; // 이미 id로 통일되었으므로 comment.id 사용
    const newContent = editContents[commentId];
    const memberId = user?.member_id;

    // 클라이언트 단에서의 권한 체크 (서버에서도 반드시 재검증되어야 함)
    if (Number(comment.member_id) !== Number(memberId)) {
      toast.error('수정 권한이 없습니다.', { autoClose: 2000, closeOnClick: true });
      return;
    }

    try {
      // TODO: 백엔드 API가 JWT 토큰 등을 통해 member_id를 스스로 추출하여 검증한다면
      //       body에 member_id를 명시적으로 보내는 것은 불필요할 수 있습니다.
      //       백엔드 API 설계에 따라 이 부분을 조정하세요.
      await axios.put(`/api/comments/${commentId}`, {
        content: newContent,
        // member_id: memberId, // 서버에서 토큰 검증 시 제거 가능
      });
      toast.success('댓글이 수정되었습니다.', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false
      });
      setEditingCommentId(null);
      setEditContents(prev => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
      loadComments(); // 수정 후 댓글 목록 새로고침
    } catch (err) {
      toast.error(err.response?.data?.message || '댓글 수정에 실패했습니다.', {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        // TODO: 백엔드 API가 JWT 토큰 등을 통해 member_id를 스스로 추출하여 검증한다면
        //       data에 member_id를 명시적으로 보내는 것은 불필요할 수 있습니다.
        //       또한, DELETE 요청은 body를 포함하지 않는 경우가 많으므로
        //       백엔드 API 설계에 따라 이 부분을 조정하세요.
        await axios.delete(`/api/comments/${commentId}`, {
          // data: { member_id: user.member_id }, // 서버에서 토큰 검증 시 제거 가능 또는 query parameter로 변경 고려
        });
        toast.success('댓글이 삭제되었습니다.', {
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: false
        });
        loadComments(); // 삭제 후 댓글 목록 새로고침
      } catch (err) {
        toast.error('댓글 삭제에 실패했습니다.', {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false
        });
      }
    }
  };

  return (
    <div className="comment-list-container">
      {loading ? (
        <p className="comment-loading">댓글을 불러오는 중...</p>
      ) : error ? (
        <p className="comment-error">{error}</p>
      ) : comments.length === 0 ? (
        <p className="no-comments">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
      ) : (
        comments.map((comment) => {
          const commentId = comment.id; // 이제 comment.id로 통일

          return (
            <div key={commentId} className="comment-item">
              <div className="comment-header">
                <img src={comment.profileUrl} alt="Profile" className="comment-author-profile-pic" />
                <div className="comment-author-info">
                  <span className="comment-author-nickname">
                    {comment.authorNickname}
                    {Number(comment.member_id) === Number(postAuthorMemberId) && (
                      <span className="comment-author-tag"> (작성자)</span>
                    )}
                  </span>
                  <span className="comment-date">
                    {formatCommentDate(comment.createdAt)} {/* 이제 comment.createdAt으로 통일 */}
                  </span>
                </div>
                {user && Number(user.member_id) === Number(comment.member_id) && (
                  <div className="comment-actions">
                    {editingCommentId === commentId ? (
                      <>
                        <button onClick={() => saveEdit(comment)}>저장</button>
                        <button onClick={() => setEditingCommentId(null)}>취소</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(commentId, comment.content)}>수정</button>
                        <button onClick={() => handleDeleteComment(commentId)}>삭제</button>
                      </>
                    )}
                  </div>
                )}
              </div>
              {editingCommentId === commentId ? (
                <textarea
                  className="comment-edit-textarea"
                  value={editContents[commentId] || ''}
                  onChange={(e) =>
                    setEditContents(prev => ({ ...prev, [commentId]: e.target.value }))
                  }
                />
              ) : (
                <p className="comment-content">{comment.content}</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}