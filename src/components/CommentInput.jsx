import React, { useState } from 'react';
import { createComment, checkForbiddenWords } from '../api/comments';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify'; // toast import 추가

export default function CommentInput({ postId, onCommentSubmitted }) {
    const { user } = useUser();
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.warn('로그인 후 댓글을 작성할 수 있습니다.'); // alert 대신 toast
            return;
        }
        if (!content.trim()) {
            toast.warn('내용을 입력해주세요!'); // alert 대신 toast
            return;
        }

        try {
            const filterRes = await checkForbiddenWords(content);
            if (!filterRes.data.is_valid) {
                toast.error(filterRes.data.message); // alert 대신 toast
                return;
            }
        } catch (err) {
            console.error('필터 검사 중 오류: ', err);
            toast.error('금지어 검사 중 오류가 발생했습니다.'); // alert 대신 toast
            return;
        }

        try {
            // TODO: 백엔드 API가 JWT 토큰 등을 통해 member_id를 스스로 추출하여 검증한다면
            //       body에 member_id를 명시적으로 보내는 것은 불필요할 수 있습니다.
            //       백엔드 API 설계에 따라 이 부분을 조정하세요.
            await createComment({
                post_id: postId,
                content,
                is_anonymous: isAnonymous,
                member_id: user.member_id, // 서버에서 토큰 검증 시 제거 가능
            });
            setContent('');
            setIsAnonymous(false);
            toast.success('댓글이 성공적으로 등록되었습니다!'); // alert 대신 toast
            onCommentSubmitted();
        } catch (err) {
            console.error('댓글 작성 실패: ', err);
            toast.error(err.response?.data?.message || '댓글 작성에 실패했습니다.'); // alert 대신 toast
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