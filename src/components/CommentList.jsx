import React, { useEffect, useState, useCallback } from "react";
import { getCommentByPostId } from "../api/comments";
import { useUser } from "../contexts/UserContext";
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

export default function CommentList({ postId, postAuthorMemberId, refreshCount }) {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContents, setEditContents] = useState({});

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
        const commentId = comment.comment_id || comment.id;
        const createdAt = comment.created_at || comment.createdAt;

        let authorNickname = '익명';
        let profileUrl = '/anonymous.png';

        if (!comment.is_anonymous) {
            authorNickname = comment.writer_name || '이름 없음';
            profileUrl = comment.profile_url || '/anonymous.png';
        }

        return {
          ...comment,
          id: commentId,
          createdAt: createdAt,
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
  }, [postId, refreshCount]); // refreshCount가 변경될 때마다 loadComments 함수가 재생성되어 useEffect를 트리거

  useEffect(() => {
    loadComments();
  }, [loadComments]);

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
    const commentId = comment.id;
    const newContent = editContents[commentId];
    const memberId = user?.member_id;

    if (Number(comment.member_id) !== Number(memberId)) {
      toast.error('수정 권한이 없습니다.', { autoClose: 2000, closeOnClick: true });
      return;
    }
    if (newContent.trim() === '') {
        toast.warn('댓글 내용을 입력해주세요.');
        return;
    }

    try {
      await axios.put(`/api/comments/${commentId}`, {
        content: newContent,
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
        await axios.delete(`/api/comments/${commentId}`); // DELETE 요청에 body는 보통 없습니다.
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
          const commentId = comment.id;

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
                    {formatCommentDate(comment.createdAt)}
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