import axios from './axiosInstance';
//댓글 작성
export const createComment = (data) => axios.post('/comments', data);
//댓글 필터링
export const checkForbiddenWords = (content) => 
    axios.get('/comments/filter', {params: {conetent}});
//댓글 목록
export const getCommentByPostId = (postId) =>
    axios.get(`/post/${postId}/comments`);
