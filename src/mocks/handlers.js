
// import { rest } from 'msw';

// export const handlers = [
//   rest.post('/api/posts', async (req, res, ctx) => {
//     const data = await req.json();
//     return res(ctx.status(201), ctx.json({ post_id: Date.now(), ...data }));
//   }),

//   rest.post('/api/auth/signup', async (req, res, ctx) => {
//     const newUser = await req.json();
//     return res(ctx.status(201), ctx.json({ message: '회원가입 성공' }));
//   }),

//   rest.post('/api/auth/login', async (req, res, ctx) => {
//     const { email, password } = await req.json();
//     if (email === 'test@example.com' && password === 'Test1234!') {
//       return res(ctx.status(200), ctx.json({ token: 'mock-token' }));
//     }
//     return res(ctx.status(401), ctx.json({ message: '로그인 실패' }));

// import { rest } from 'msw';

// const mockPosts = [
//   {
//     id: 1,
//     title: 'Mock 게시글',
//     author: '테스터',
//     content: '내용입니다',
//     category: '동아리',
//   },
// ];

// const mockUsers = [
//   {
//     email: 'testuser@example.com',
//     password: 'Test1234!',
//     name: '홍길동',
//     college: '융합기술대학',
//     student_num: '202412345',
//     major: '컴퓨터공학과',
//   },
// ];

// export const handlers = [
//   // 게시글 등록
//   rest.post('/posts', async (req, res, ctx) => {
//     const newPost = await req.json();
//     console.log('📩 받은 게시글:', newPost);
//     const created = { id: Date.now(), ...newPost };
//     mockPosts.push(created);
//     return res(ctx.status(201), ctx.json(created));
//   }),

//   // 게시글 목록
//   rest.get('/posts', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(mockPosts));
//   }),

//   // 로그인
//   rest.post('/api/auth/login', async (req, res, ctx) => {
//     const { email, password } = await req.json();
//     const user = mockUsers.find(u => u.email === email && u.password === password);

//     if (user) {
//       return res(
//         ctx.status(200),
//         ctx.json({ message: '로그인 성공', user: { ...user, token: 'mock-token' } })
//       );
//     } else {
//       return res(ctx.status(401), ctx.json({ message: '이메일 또는 비밀번호가 틀렸습니다' }));
//     }
//   }),

//   // 회원가입
//   rest.post('/api/auth/signup', async (req, res, ctx) => {
//     const newUser = await req.json();
//     console.log('🧍 회원가입 요청:', newUser);
//     mockUsers.push(newUser);
//     return res(ctx.status(201), ctx.json({ message: '회원가입 성공' }));

//   }),
// ];