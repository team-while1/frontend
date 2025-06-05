import { rest } from 'msw';

export const handlers = [
  rest.post('/posts', async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ message: '모임 등록 성공!' })
    );
  }),
];