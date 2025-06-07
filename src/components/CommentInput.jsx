import { useState } from 'react';
import { createComment, checkForbiddenWords } from '../api/comments';

export default function CommentInput({postId, memberId, onCommentSubmitted }) {
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleSubmit = async () => {
        if(!content.trim()){
            alert('내용을 입력해주세요!');
            return;
        }

        //금지 키워드 검사
        try{
            const filterRes = await checkForbiddenWords(content);
            if(!filterRes.data.is_valid){
                alert(filterRes.data.message);
                return;
            }
        }catch(err){
            console.error('필터 검사 중 오류: ', err);
            return;
        }

        //댓글 작성
        try{
            await createComment({
                post_id: postId,
                member_id: memberId,
                content,
                is_anonymous: isAnonymous,
            });
            setContent(''); //입력창 초기화
            onCommentSubmitted(); //부모 컴포넌트에 댓글 등록 알림
        }catch(err){
            console.error('댓글 작성 실패: ',err);
            alert('댓글 작성에 실패했습니다.');
        }
    };
    
    return (
        <div>
            <textarea
                placeholder='댓글을 입력하세요'
                value={content}
                onChange={(e)=> setContent(e.target.value)}
            />
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e)=> setIsAnonymous(e.target.checked)}
                    />
                    익명으로 작성
                </label>
            </div>
            <button onClick={handleSubmit}>댓글 등록</button>
        </div>
    )
}