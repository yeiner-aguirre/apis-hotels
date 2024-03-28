const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST/users debe de crearme correctamente los usuarios', async () => {
    const body = {
        firstName:'carlos',
        lastName:'herrera',
        email:'carlos@gmail.com',
        password:'1234',
        gender:'MALE'
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST/users/login debe crear un usuario correctamente', async () => {
    const body = {
        email: 'carlos@gmail.com',
        password: '1234',
    };
    const res = await request(app)
        .post('/users/login')
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET/users debe traer todos los usuarios', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT/users/:id debe actualizar datos de un usuarios previamente creado', async () => {
    const body = {
        firstName:'juan'
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName)  
});

test('POST/users/login con credenciales invalidas debe enviar error', async () => {
    const body = {
        email:"incorrecto@gmail.com",
        password:"1234incorecto"
    }
    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401);
});

test('DELETE/users/:id debe eliminar un usuario ya creado', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
