import axios from './axiosInstance';

// 댓글 작성
export const createComment = (data) =>
  axios.post('/api/comments', data);

// 댓글 필터링 (금지어 검사)
export const checkForbiddenWords = (content) =>
  axios.get('/api/comments/filter', { params: { content } });

// 댓글 단건 조회 (GET /api/comments/{comment_id})
export const getCommentById = (commentId) =>
  axios.get(`/api/comments/${commentId}`);

// 특정 게시글의 댓글 목록 조회
export const getCommentByPostId = (postId) =>
  axios.get(`/api/comments/post/${postId}`);

// 댓글 수정
export const updateComment = async ({ commentId, member_id, content }) => {
  return await axios.put(`/api/comments/${commentId}`, {
    content :newContent,
  });
};

// 댓글 삭제
export const deleteComment = async ({ commentId, member_id }) => {
  return await axios.delete(`/api/comments/${commentId}`, {
    data: { member_id },
  });
};