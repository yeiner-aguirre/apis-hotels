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

test('GET/booking debe de traerme las reservas correctamente', async () => {
    const res = await request(app)
        .get('/bookings')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('POST/booking debe de crearme una reserva', async () => {
    const body = {
        checkIn: 2024-11-16,
        checkOut: 2024-11-20,
    }
    const res = await request(app)
        .post('/bookings')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
    expect(res.body.headline).toBe(body.headline)
});

test('DELETE/bookings debe eliminar una reserva', async () => {
    const res = await request(app)
        .delete('/bookings/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});