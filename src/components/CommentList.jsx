import React, { useEffect, useState } from "react";
import { getCommentByPostId } from "../api/comments";
import { useUser } from "../contexts/UserContext";
import axios from '../api/axiosInstance';

export default function CommentList({ postId, postAuthorMemberId }) {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorInfoCache, setAuthorInfoCache] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContents, setEditContents] = useState({});

  const loadComments = async () => {
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

      console.log("📌 [DEBUG] 원본 댓글 리스트:", fetchedComments);

      const commentsWithAuthorInfo = await Promise.all(
        fetchedComments.map(async (comment) => {
          console.log(`🔎 [DEBUG] comment_id: ${comment.comment_id || comment.id}, member_id: ${comment.member_id}, content: ${comment.content}`);

          if (comment.is_anonymous) {
            return { ...comment, authorNickname: '익명', profileUrl: '/anonymous.png' };
          }

          if (!comment.member_id) {
            return {
              ...comment,
              authorNickname: `알 수 없음`,
              profileUrl: '/anonymous.png',
            };
          }

          if (authorInfoCache[comment.member_id]) {
            return {
              ...comment,
              authorNickname: authorInfoCache[comment.member_id].name,
              profileUrl: authorInfoCache[comment.member_id].profile_url,
            };
          }

          try {
            const authorRes = await axios.get(`/api/member/${comment.member_id}`);
            const author = authorRes.data;
            setAuthorInfoCache(prev => ({ ...prev, [comment.member_id]: author }));
            return {
              ...comment,
              authorNickname: author.name,
              profileUrl: author.profile_url,
            };
          } catch (authorErr) {
            return {
              ...comment,
              authorNickname: `사용자 ${comment.member_id}`,
              profileUrl: '/anonymous.png',
            };
          }
        })
      );

      setComments(commentsWithAuthorInfo);
    } catch (err) {
      setError('댓글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

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

  const saveEdit = async (commentId) => {
    const newContent = editContents[commentId];
    const memberId = user?.member_id;

    console.log("📤 [DEBUG] 수정 요청:", { commentId, member_id: memberId, content: newContent });

    try {
      await axios.put(`/api/comments/${commentId}`, {
        member_id: memberId,
        content: newContent,
      });
      alert('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      setEditContents(prev => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
      loadComments();
    } catch (err) {
      console.error('❌ 댓글 수정 실패:', err);
      alert(err.response?.data?.message || '댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/comments/${commentId}`, {
          data: { member_id: user.member_id },
        });
        alert('댓글이 삭제되었습니다.');
        loadComments();
      } catch (err) {
        alert('댓글 삭제에 실패했습니다.');
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
          const commentId = comment.comment_id || comment.id;

          return (
            <div key={commentId} className="comment-item">
              <div className="comment-header">
                <img src={comment.profileUrl} alt="Profile" className="comment-author-profile-pic" />
                <div className="comment-author-info">
                  <span className="comment-author-nickname">
                    {comment.is_anonymous ? '익명' : comment.authorNickname}
                    {comment.member_id === postAuthorMemberId && <span className="comment-author-tag"> (작성자)</span>}
                  </span>
                  <span className="comment-date">{formatCommentDate(comment.created_at)}</span>
                </div>
                {user && user.member_id === comment.member_id && !comment.is_anonymous && (
                  <div className="comment-actions">
                    {editingCommentId === commentId ? (
                      <>
                        <button onClick={() => saveEdit(commentId)}>저장</button>
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