import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useState } from "react";

export default function CommentSection({postId, memberId}){
    const [refresh, setRefresh] = useState(0);

    const reload = () => setRefresh((prev) => prev + 1); //댓글 새로고침

    return (
        <div>
            <CommentInput
            postId={postId}
            memberId={memberId}
            onCommentSubmitted={reload}
            />
            <CommentList
            key={refresh} //key 변경 시 List 컴포넌트 리렌더링
            postId={postId}
            />
        </div>
    )
}