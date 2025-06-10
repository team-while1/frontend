import React, { useState } from 'react';
import { createComment, checkForbiddenWords } from '../api/comments';
import { useUser } from '../contexts/UserContext'; // UserContext 경로 확인

export default function CommentInput({ postId, onCommentSubmitted }) { // memberId는 useUser에서 가져오므로 props에서 제거
    const { user } = useUser(); // 현재 로그인된 사용자 정보
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false); // 기본값을 익명 해제 (선택에 따라)

    const handleSubmit = async () => {
        if (!user) { // 로그인하지 않은 경우
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }
        if (!content.trim()) {
            alert('내용을 입력해주세요!');
            return;
        }

        // 금지 키워드 검사
        try {
            const filterRes = await checkForbiddenWords(content);
            if (!filterRes.data.is_valid) {
                alert(filterRes.data.message);
                return;
            }
        } catch (err) {
            console.error('필터 검사 중 오류: ', err);
            alert('금지어 검사 중 오류가 발생했습니다.'); // 사용자에게 더 친화적인 메시지
            return;
        }

        // 댓글 작성
        try {
            await createComment({
                content,
                is_anonymous: isAnonymous,
            });
            setContent(''); // 입력창 초기화
            setIsAnonymous(false); // 익명 체크박스 초기화 (선택 사항)
            alert('댓글이 성공적으로 등록되었습니다!');
            onCommentSubmitted(); // 부모 컴포넌트에 댓글 등록 알림
        } catch (err) {
            console.error('댓글 작성 실패: ', err);
            // 백엔드에서 특정 에러 메시지를 주는 경우
            alert(err.response?.data?.message || '댓글 작성에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-input-form">
            <textarea
                placeholder={user ? "댓글을 입력하세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!user} // 로그인하지 않으면 비활성화
                rows="3"
            />
            <div className="comment-form-bottom">
                <label className="anonymous-checkbox">
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        disabled={!user} // 로그인하지 않으면 비활성화
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