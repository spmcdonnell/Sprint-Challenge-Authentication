const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('auth-router.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /register', () => {
        it('returns 201 CREATED', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'qwerty', password: 'qwerty' })
                .set('Accept', 'application/json')
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });

        it('returns the user object that was created ', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'jack', password: 'jack' })
                .set('Accept', 'application/json')
                .then(res => {
                    expect(res.body.username).toBe('jack');
                });
        });
    });

    describe('POST /login', () => {
        it('returns 200 okay', () => {
            request(server)
                .post('/api/auth/register')
                .send({ username: 'hello', password: 'hello' })
                .set('Accept', 'application/json')
                .then(res => {});

            return request(server)
                .post('/api/auth/login')
                .send({ username: 'hello', password: 'hello' })
                .set('Accept', 'application/json')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it('returns the welcome message', () => {
            request(server)
                .post('/api/auth/register')
                .send({ username: 'goodbye', password: 'goodbye' })
                .set('Accept', 'application/json')
                .then(res => {});

            return request(server)
                .post('/api/auth/login')
                .send({ username: 'goodbye', password: 'goodbye' })
                .set('Accept', 'application/json')
                .then(res => {
                    expect(res.body.message).toBe('Welcome goodbye!');
                });
        });
    });
});
