const { test, before, after } = require('node:test');
const assert = require('node:assert');

// Env must be set before the app (and its config) is required.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-at-least-32-characters-long';
process.env.JWT_EXPIRES_IN = '1h';
process.env.REFRESH_EXPIRES_IN = '30d';
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const request = require('supertest');

let mongod;
let app;

const CREDS = { name: 'Test User', email: 'test@example.com', password: 'Sup3rSecret!pw' };

const cookiesOf = (res) => res.headers['set-cookie'] || [];
const cookieNamed = (res, name) => cookiesOf(res).find((c) => c.startsWith(`${name}=`));
// Serialize set-cookie headers back into a request Cookie header value.
const asCookieHeader = (...setCookies) =>
  setCookies.filter(Boolean).map((c) => c.split(';')[0]).join('; ');

before(async () => {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri('skillbridge-test');
  await mongoose.connect(process.env.MONGO_URI);
  app = require('../src/app');
});

after(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

test('auth flow: register → login → me → refresh (with rotation) → logout', async (t) => {
  let accessCookie;
  let refreshCookie;
  let bearerToken;

  await t.test('register sets both cookies and returns the user', async () => {
    const res = await request(app).post('/api/auth/register').send(CREDS);
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.data.user.email, CREDS.email);
    assert.ok(!('password' in res.body.data.user), 'password never in response');
    assert.ok(!('refreshTokens' in res.body.data.user), 'refresh hashes never in response');
    assert.ok(cookieNamed(res, 'token'), 'access cookie set');
    const refresh = cookieNamed(res, 'refreshToken');
    assert.ok(refresh, 'refresh cookie set');
    assert.match(refresh, /Path=\/api\/auth/i, 'refresh cookie scoped to /api/auth');
    assert.match(refresh, /HttpOnly/i);
  });

  await t.test('login issues a fresh pair', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: CREDS.email, password: CREDS.password });
    assert.strictEqual(res.status, 200);
    accessCookie = cookieNamed(res, 'token');
    refreshCookie = cookieNamed(res, 'refreshToken');
    bearerToken = res.body.data.token;
    assert.ok(accessCookie && refreshCookie && bearerToken);
  });

  await t.test('GET /auth/me works via cookie and via Bearer header', async () => {
    const viaCookie = await request(app)
      .get('/api/auth/me')
      .set('Cookie', asCookieHeader(accessCookie));
    assert.strictEqual(viaCookie.status, 200);
    assert.strictEqual(viaCookie.body.data.email, CREDS.email);

    const viaBearer = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${bearerToken}`);
    assert.strictEqual(viaBearer.status, 200);
    assert.strictEqual(viaBearer.body.data.email, CREDS.email);
  });

  await t.test('refresh rotates the pair; the used token is rejected on replay', async () => {
    const oldRefreshCookie = refreshCookie;
    const res = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', asCookieHeader(oldRefreshCookie));
    assert.strictEqual(res.status, 200);
    accessCookie = cookieNamed(res, 'token');
    refreshCookie = cookieNamed(res, 'refreshToken');
    assert.ok(accessCookie && refreshCookie, 'new pair issued');
    assert.notStrictEqual(
      refreshCookie.split(';')[0],
      oldRefreshCookie.split(';')[0],
      'refresh token rotated'
    );

    const replay = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', asCookieHeader(oldRefreshCookie));
    assert.strictEqual(replay.status, 401, 'rotated-out token must be rejected');
  });

  await t.test('the rotated-in access cookie authenticates', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', asCookieHeader(accessCookie));
    assert.strictEqual(res.status, 200);
  });

  await t.test('refresh without a cookie → 401', async () => {
    const res = await request(app).post('/api/auth/refresh');
    assert.strictEqual(res.status, 401);
  });

  await t.test('logout revokes the refresh token', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', asCookieHeader(accessCookie, refreshCookie));
    assert.strictEqual(res.status, 200);

    const afterLogout = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', asCookieHeader(refreshCookie));
    assert.strictEqual(afterLogout.status, 401, 'revoked token must not refresh');
  });

  await t.test('wrong password → 401 without cookies', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: CREDS.email, password: 'wrong-password-123' });
    assert.strictEqual(res.status, 401);
    assert.strictEqual(cookiesOf(res).length, 0, 'no cookies on failed login');
  });
});
