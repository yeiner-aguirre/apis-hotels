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

test('GET/ hotels debe de traerme los hoteles creados', async () => {
    const res = await request(app).get('/hotels')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST/hotels debe de crear un hotel correctamente', async () => {
    const body = {
        name:"test hotel",
        description:"descripcion del test hotel",
        price:0.00,
        Address:"direccion del test",
        lat:0.00,
        lon:0.00,
    }
    const res = await request(app)
        .post('/hotels')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
    expect(res.body.headline).toBe(body.headline)
});

test('DELETE/hotels debe eliminar un hotel', async () => {
    const res = await request(app)
        .delete('/hotels/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});