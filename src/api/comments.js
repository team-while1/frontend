import axios from './axiosInstance'; // axiosInstance 경로 확인

// 댓글 작성
export const createComment = (data) => axios.post('/api/comments', data);

// 댓글 필터링 (금지어 검사)
export const checkForbiddenWords = (content) =>
    axios.get('/api/comments/filter', { params: { content } }); 

// 특정 게시글의 댓글 목록 조회
export const getCommentByPostId = (postId) =>
    axios.get(`/api/comments/post/${postId}`); 