import { rest } from 'msw'; // ✅ 다시 이렇게
export const handlers = [
  // 예: 게시글 등록 (POST)
  rest.post('/posts', async (req, res, ctx) => {
    const newPost = await req.json();
    console.log('📩 받은 게시글:', newPost);

    return res(
      ctx.status(201),
      ctx.json({
        id: Date.now(), // 임의 ID
        ...newPost,
      })
    );
  }),

  // 예: 게시글 목록 (GET)
  rest.get('/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'Mock 게시글',
          author: '테스터',
          content: '내용입니다',
          category: '동아리',
        },
      ])
    );
  }),
];