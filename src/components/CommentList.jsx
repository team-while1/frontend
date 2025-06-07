import { useEffect,useState } from "react";
import { getCommentByPostId } from "../api/comments";

export default function CommentList({postId}){
    const [comments, setComments] = useState([]);
    
    const loadComments = async () => {
        try {
            const res = await getCommentByPostId(postId);
            setComments(res.data);
        }catch(err){
            console.error('댓글 목록 불러오기 실패: ',err);
        }
    };

    useEffect(()=>{
        loadComments();
    }, [postId]);

    return (
        <div>
            <h4>댓글 목록</h4>
            <ul>
                {comments.map((comments)=> (
                    <li key={comment.comment_id}>
                        <b>{comment.is_anonymous ? '익명' : `유저 ${comment.member_id}`}</b>
                        : {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}