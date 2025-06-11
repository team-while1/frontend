import React, { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import '../styles/CommentSection.css'; 

export default function CommentSection({ postId, postAuthorMemberId }) {
    // refreshComments를 refreshCount로 이름 변경 (의미 명확화)
    const [refreshCount, setRefreshCount] = useState(0);

    const handleCommentSubmitted = () => {
        // 댓글이 등록되면 refreshCount를 증가시켜 CommentList의 useEffect를 트리거
        setRefreshCount((prev) => prev + 1); 
    };

    return (
        <div className="comment-section-container">
            <h3>
            <img src="/comment.png" alt="댓글" className="section-icon" />
            댓글
            </h3>
            <CommentInput
                postId={postId}
                onCommentSubmitted={handleCommentSubmitted}
            />
            {/* key prop 대신 refreshCount prop을 전달하여 CommentList 내부에서 useEffect가 반응하도록 함 */}
            <CommentList
                postId={postId}
                postAuthorMemberId={postAuthorMemberId}
                refreshCount={refreshCount} // 새로운 prop 추가
            />
        </div>
    );
}