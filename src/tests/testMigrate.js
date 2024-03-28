const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: 'TEST',
            lastName: 'TEST',
            email:'test@gmail.com',
            password:'1234',
            gender:'OTHER'
        }
        await request(app).post('/users').send(user);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();