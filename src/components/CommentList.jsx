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

    const loadComments = async () => {
        if (!postId) {
            console.warn("postId가 유효하지 않아 댓글을 불러올 수 없습니다. CommentList 렌더링 조건을 확인하세요.");
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

            const commentsWithAuthorInfo = await Promise.all(
                fetchedComments.map(async (comment) => {
                    if (comment.is_anonymous) {
                        return { ...comment, authorNickname: '익명', profileUrl: '/images/profile/anonymous.png' };
                    }

                    if (authorInfoCache[comment.member_id]) {
                        return { ...comment, authorNickname: authorInfoCache[comment.member_id].name, profileUrl: authorInfoCache[comment.member_id].profile_url };
                    }

                    try {
                        // ⭐ 백엔드에 GET /api/member/{member_id} API가 있어야 함
                        const authorRes = await axios.get(`/api/member/${comment.member_id}`);
                        const author = authorRes.data;
                        // 캐시에 저장
                        setAuthorInfoCache(prev => ({ ...prev, [comment.member_id]: author }));
                        return { ...comment, authorNickname: author.name, profileUrl: author.profile_url };
                    } catch (authorErr) {
                        console.warn(`❌ 멤버 ID ${comment.member_id} 정보 불러오기 실패:`, authorErr);
                        return { ...comment, authorNickname: `사용자 ${comment.member_id}`, profileUrl: '/images/profile/anonymous.png' };
                    }
                })
            );

            setComments(commentsWithAuthorInfo);
        } catch (err) {
            console.error('댓글 목록 불러오기 실패: ', err);
            setError('댓글을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postId) {
            loadComments();
        } else {
            setLoading(false);
            setComments([]);
            setError('게시물 ID가 유효하지 않습니다.');
        }
    }, [postId]); 

    const formatCommentDate = (dateString) => {
        if (!dateString) return '날짜 없음';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.warn("유효하지 않은 날짜 문자열:", dateString);
            return '날짜 오류';
        }

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return '방금 전';
        if (diffMinutes < 60) return `${diffMinutes}분 전`;
        if (diffHours < 24) return `${diffHours}시간 전`;
        if (diffDays < 7) return `${diffDays}일 전`;

        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // TODO: 댓글 수정/삭제 핸들러 구현
    const handleEditComment = (commentId) => {
        alert(`댓글 ${commentId} 수정 기능 (구현 필요)`);
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
            try {
                // ⭐ 백엔드 댓글 삭제 API 호출 (예시)
                // await axios.delete(`/api/comments/${commentId}`); // 실제 API 경로 확인 필요
                alert('댓글이 삭제되었습니다.');
                loadComments(); // 댓글 목록 새로고침
            } catch (err) {
                console.error('댓글 삭제 실패:', err);
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
                comments.map((comment) => (
                    <div key={comment.comment_id} className="comment-item"> {/* 백엔드에서 오는 comment_id 사용 */}
                        <div className="comment-header">
                            <img
                                src={comment.profileUrl}
                                alt="Profile"
                                className="comment-author-profile-pic"
                            />
                            <div className="comment-author-info">
                                <span className="comment-author-nickname">
                                    {comment.is_anonymous ? '익명' : comment.authorNickname}
                                    {/* 게시글 작성자의 댓글이면 '작성자' 태그 표시 */}
                                    {comment.member_id === postAuthorMemberId && (
                                        <span className="comment-author-tag"> (작성자)</span>
                                    )}
                                </span>
                                <span className="comment-date">{formatCommentDate(comment.created_at)}</span> {/* 백엔드에서 오는 created_at 사용 */}
                            </div>
                            {/* 본인 댓글에만 수정/삭제 버튼 표시 (익명 댓글은 수정/삭제 불가로 가정) */}
                            {user && user.member_id === comment.member_id && !comment.is_anonymous && (
                                <div className="comment-actions">
                                    <button
                                        className="comment-action-button"
                                        onClick={() => handleEditComment(comment.comment_id)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="comment-action-button"
                                        onClick={() => handleDeleteComment(comment.comment_id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                        <p className="comment-content">{comment.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}