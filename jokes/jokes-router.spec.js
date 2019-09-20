const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('jokes-router.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('GET /', () => {
        it('returns 200 OK', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({ username: 'hello2', password: 'hello2' })
                .set('Accept', 'application/json')
                .then(res => {});

            request(server)
                .post('/api/auth/login')
                .send({ username: 'hello2', password: 'hello2' })
                .set('Accept', 'application/json')
                .then(res => {
                    return request(server)
                        .get('/api/jokes')
                        .then(res => {
                            expect(res.status).toBe(200);
                        });
                });
        });

        it('returns an array of joke objects', () => {
            request(server)
                .post('/api/auth/login')
                .send({ username: 'hello2', password: 'hello2' })
                .set('Content-Type', 'application/json')
                .then(res => {
                    return request(server)
                        .get('/api/jokes')
                        .then(res => {
                            console.log(res);
                            expect(res.path).toBe('/api/jokes');
                        });
                });
        });
    });
});
