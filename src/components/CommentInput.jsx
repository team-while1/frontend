import React, { useState } from 'react';
import { createComment, checkForbiddenWords } from '../api/comments';
import { useUser } from '../contexts/UserContext';

export default function CommentInput({ postId, onCommentSubmitted }) {
    const { user } = useUser();
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }
        if (!content.trim()) {
            alert('내용을 입력해주세요!');
            return;
        }

        try {
            const filterRes = await checkForbiddenWords(content);
            if (!filterRes.data.is_valid) {
                alert(filterRes.data.message);
                return;
            }
        } catch (err) {
            console.error('필터 검사 중 오류: ', err);
            alert('금지어 검사 중 오류가 발생했습니다.');
            return;
        }

        try {
            await createComment({
                post_id: postId,
                content,
                is_anonymous: isAnonymous,
                member_id: user.member_id,
            });
            setContent('');
            setIsAnonymous(false);
            alert('댓글이 성공적으로 등록되었습니다!');
            onCommentSubmitted();
        } catch (err) {
            console.error('댓글 작성 실패: ', err);
            alert(err.response?.data?.message || '댓글 작성에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-input-form">
            <textarea
                placeholder={user ? "댓글을 입력하세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!user}
                rows="3"
            />
            <div className="comment-form-bottom">
                <label className="anonymous-checkbox">
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        disabled={!user}
                    />
                    익명으로 작성
                </label>
                <button type="submit" disabled={!user || content.trim() === ''}>
                    댓글 등록
                </button>
            </div>
        </form>
    );
}