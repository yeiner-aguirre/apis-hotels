const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: 'test@gmail.com',
        password: '1234',
    });
    token = res.body.token;
})

test('GET/reviews debe de traerme las reviews', async () => {
    const res = await request(app)
        .get('/reviews')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('POST/reviews debe de crearme una review', async () => {
    const body = {
       rating:4,
       comment:"buen hotel" 
    }
    const res = await request(app)
        .post('/reviews')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
    expect(res.body.headline).toBe(body.headline)
});

test('DELETE/reviews debe eliminar una review', async () => {
    const res = await request(app)
        .delete('/reviews/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});