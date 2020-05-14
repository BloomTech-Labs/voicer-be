const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

const userData = {
  display_name: "ChrisQuinn",
  first_name: "Chris",
  last_name: "Quinn",
  email: "caquinn.86@gmail.com"
}

let token;

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
})

describe('auth-router.js', () => {
  it('should register a user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        ...userData,
        password: "password"
      })
      .set('Accept', 'application/json');
    const user = await db('users')
      .where({display_name: "ChrisQuinn"})
      .first()
      .select("display_name", "first_name", "last_name", "email");

    expect(user).toEqual(userData);
  })

  it('should not allow duplicate emails', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        display_name: "VoicerTest",
        first_name: "Voicer",
        last_name: "Test",
        email: "VoicerTest@test.com",
        password: "password"
      })
      .set('Accept', 'application/json');
    expect(res.body.message).toEqual('Could not add user');
  })

  it('should log a user in', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: "VoicerTest@test.com",
        password: "password"
      })
      .set('Accept', 'application/json');
    
    expect(res.body.token).toEqual(token);
  })

  it('should not accept a wrong password', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: "VoicerTest@test.com",
        password: "something"
      })
      .set('Accept', 'application/json');
    
    expect(res.body.message).toEqual('Incorrect username and/or password');
  })

  it('should return an error if user not found', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: "Something@test.com",
        password: "password"
      })
      .set('Accept', 'application/json');

    expect(res.body.error);
  })
})

beforeEach(async () => {
  await db('users').truncate();
  res = await request(server)
    .post('/api/auth/register')
    .send({
      display_name: "VoicerTest",
      first_name: "Voicer",
      last_name: "Test",
      email: "VoicerTest@test.com",
      password: "password"
    })
    .set('Accept', 'application/json');
  token = res.body.token;
})