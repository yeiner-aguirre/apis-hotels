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

test('GET/cities debe traer todas la ciudades', async () => {
    const res = await request(app)
        .get('/cities')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/cities debe crear una ciudad correctamente", async () => {
    const body = {
        name: "buenos aires",
        country: "argentina",
        countryId: "ARG"
    }
    const res = await request(app)
        .post('/cities')
        .send(body)
        .set('Authorization',`Bearer ${token}`);
    id = res.body.id;    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test("GET/cities/:id debe traer una ciudad por id correctamente", async () => {
    const res = await request(app)
        .get(`/cities/${id}`)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBeDefined();
});

test("PUT/cities/:id debe actualizar una ciudad previamente creada", async () => {
    const body = {
        name: "buenos aires actualizado"
    }
    const res = await request(app)
        .put(`/cities/${id}`)
        .send(body)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE/cities/:id debe eliminar una ciudad", async () => {
    const res = await request(app)
        .delete(`/cities/${id}`)
        .set('Authorization',`Bearer ${token}`);  
    expect(res.status).toBe(204);
});
