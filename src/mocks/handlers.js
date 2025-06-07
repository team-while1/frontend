// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/posts', async (req, res, ctx) => {
    const data = await req.json();
    return res(ctx.status(201), ctx.json({ post_id: Date.now(), ...data }));
  }),

  rest.post('/api/auth/signup', async (req, res, ctx) => {
    const newUser = await req.json();
    return res(ctx.status(201), ctx.json({ message: '회원가입 성공' }));
  }),

  rest.post('/api/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@example.com' && password === 'Test1234!') {
      return res(ctx.status(200), ctx.json({ token: 'mock-token' }));
    }
    return res(ctx.status(401), ctx.json({ message: '로그인 실패' }));
  }),
];