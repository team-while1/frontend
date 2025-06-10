import React, { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import '../styles/CommentSection.css'; 

export default function CommentSection({ postId, postAuthorMemberId }) {
    const [refreshComments, setRefreshComments] = useState(0);

    const handleCommentSubmitted = () => {
        setRefreshComments((prev) => prev + 1); 
    };

    return (
        <div className="comment-section-container">
            <h3>💬 댓글</h3>
            <CommentInput
                postId={postId}
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
