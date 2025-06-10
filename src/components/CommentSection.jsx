import React, { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import '../styles/CommentSection.css'; 

export default function CommentSection({ postId, memberId: postAuthorMemberId }) { // memberId를 postAuthorMemberId로 변경하여 props 이름 명확화
    const [refreshComments, setRefreshComments] = useState(0);

    const handleCommentSubmitted = () => {
        setRefreshComments((prev) => prev + 1); 
    };

    return (
        <div className="comment-section-container">
            <h3>💬 댓글 ({/* TODO: 백엔드에서 댓글 총 개수 가져오기 */})</h3> {/* 댓글 개수 표시 */}
            <CommentInput
                postId={postId}
                // memberId={memberId} // CommentInput에서 useUser 훅 사용하므로 불필요
                onCommentSubmitted={handleCommentSubmitted}
            />
            <CommentList
                key={refreshComments} 
                postId={postId}
                postAuthorMemberId={postAuthorMemberId}
            />
        </div>
    );
}