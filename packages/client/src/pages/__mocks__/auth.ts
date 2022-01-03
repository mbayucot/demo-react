import { rest } from 'msw';

interface User {
  id?: number;
  email: string;
  password?: string;
}

const data = {
  id: 1,
  email: 'test@test.com',
} as User;

const token = '__test_token__';

const handlers = [
  rest.post(`${process.env.REACT_APP_HOST_URL}/signup`, (req, res, ctx) => {
    const { user } = req.body as {
      user: User;
    };
    if (user.email === 'invalid@email.com') {
      return res(ctx.status(422), ctx.json({ email: '__test_error_description__' }));
    }

    return res(ctx.status(200), ctx.set('authorization', token), ctx.json(data));
  }),
  rest.post(`${process.env.REACT_APP_HOST_URL}/login`, (req, res, ctx) => {
    const { user } = req.body as {
      user: User;
    };

    if (user.email === 'invalid@email.com') {
      return res(ctx.status(422), ctx.json({ email: '__test_error_description__' }));
    }

    return res(ctx.status(200), ctx.set('authorization', token), ctx.json(data));
  }),
  rest.delete(`${process.env.REACT_APP_HOST_URL}/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export { handlers, data };
