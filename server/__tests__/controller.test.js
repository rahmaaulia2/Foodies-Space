const { describe, expect, test } = require('@jest/globals')
const request = require('supertest');
const { User, Food, FoodUser } = require('../models');
const app = require('../app');
const { signToken } = require('../helper/jwt');

let token1;
let token2;

beforeAll(async () => {
    let user1 = await User.create({ fullName: "Admin1", email: "admin1@gmail.com", password: "123456", gender: "female" })
    let user2 = await User.create({ "fullName": "Admin2", "email": "admin2@gmail.com", "password": "123456", "gender": "male" })
    let Foods = await Food.create({
        "strMeal": "Rendang",
        "strCategory": "Padang",
        "strArea": "Sumatera Barat",
        "strInstructions": "Masak dong gaes",
        "strMealThumb": "anggap aja ada linknya ya",
        "strYoutube": "ini juga ya",
        "strIngredient": "ingredientnya banyak ges",
        "strMeasure": "ini juga banyak",
        "strSource": "link source ceritanya",
        "UserId": "1"
    })
    token1 = signToken({ id: 1, email: 'admin1@gmail.com', password: "123456" })
    token2 = signToken({ id: 2, email: "admin2@gmail.com", password: '123456' })
})

test('POST /register should return ', async () => {
    let result = await request(app).post('/register').send({
        "fullName": "Rahma Lagi",
        "email": "Rahma2@gmail.com",
        "password": "123456",
        "gender": "female"
    })
    expect(result.status).toBe(201)
    expect(result.body).toBeInstanceOf(Object)
    expect(result.body).toHaveProperty('fullName', 'Rahma Lagi')
    expect(result.body).toHaveProperty('email', 'Rahma2@gmail.com')
    expect(result.body).toHaveProperty('gender', 'female')
})

test('POST /register error validation ', async () => {
    let result = await request(app).post('/register').send({
        "fullName": "",
        "email": "Rahma2@gmail.com",
        "password": "123456",
        "gender": "female"
    })
    expect(result.status).toBe(400)
    expect(result.body).toHaveProperty('message', "FullName is required")
})

test('POST /register error validation ', async () => {
    let result = await request(app).post('/register').send({
        "fullName": "Rahma Lagi",
        "email": "Rahma2gmail.com",
        "password": "123456",
        "gender": "female"
    })
    expect(result.status).toBe(400)
    expect(result.body).toHaveProperty('message', "Input must Email Format")
})

test('POST /login get access token', async () => {
    let result = await request(app).post('/login').send({ email: 'admin1@gmail.com', password: '123456' });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object)
    expect(result.body).toHaveProperty("access_token", expect.any(String))
})

test('POST /login should return error email is required', async () => {
    let result = await request(app).post('/login').send({ email: '', password: '123456' });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "Email Is Required")
})

test('POST /login should return error password is required', async () => {
    let result = await request(app).post('/login').send({ email: 'admin1@gmail.com', password: '' });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "Password Is Required")
})

test('POST /login should return error Email / Password is Invalid', async () => {
    let result = await request(app).post('/login').send({ email: 'admin1@gmail.com', password: 'avsg' });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "Email / Password is Invalid")
})

test('POST /login should return error Email / Password is Invalid', async () => {
    let result = await request(app).post('/login').send({ email: 'admin@gmail.com', password: '123456' });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "Email / Password is Invalid")
})

test('GET /foods should return all data', async () => {
    let result = await request(app).get('/foods').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
})

test('GET /foods should error Invalid token', async () => {
    let result = await request(app).get('/foods').set('Authorization', 'Bearer')
    expect(result.status).toBe(401)
    expect(result.body).toHaveProperty('message', 'Invalid Token')
})

test('POST /foods should return return error validation', async () => {
    let result = await request(app).post('/foods').set('Authorization', `Bearer ${token1}`).send({
        "strMeal": "",
        "strCategory": "Padang",
        "strArea": "Sumatera Barat",
        "strInstructions": "Masak dong gaes",
        "strMealThumb": "anggap aja ada linknya ya",
        "strYoutube": "ini juga ya",
        "strIngredient": "ingredientnya banyak ges",
        "strMeasure": "ini juga banyak",
        "strSource": "link source ceritanya",
        "UserId": "1"
    })
    expect(result.status).toBe(400)
    expect(result.body).toHaveProperty('message', 'strMeal is required')
})

test("GET /foods/:id should return data by id", async () => {
    let result = await request(app).get('/foods/1').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
})

test('GET /foods/:id should error Invalid token', async () => {
    let result = await request(app).get('/foods/1').set('Authorization', 'Bearer')
    expect(result.status).toBe(401)
    expect(result.body).toHaveProperty('message', 'Invalid Token')
})

test('GET /foods/:id should error Invalid token', async () => {
    let result = await request(app).get('/foods/1').set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWhtYTFAZ21haWwuY29tIiwiaWF0IjoxNzIwNTgzOTQ0fQ.OXvB7BsGP5Yv5wBZuEPjVAy6tD9_iJmQ5TsFeSZ')
    expect(result.status).toBe(401)
    expect(result.body).toHaveProperty('message', 'Invalid Token')
})

test('PUT /foods/:id should return updated data', async () => {
    let result = await request(app).put('/foods/1').set('Authorization', `Bearer ${token1}`).send({
        "strMeal": "New Rendang",
        "strCategory": "Padang",
        "strArea": "Sumatera Barat",
        "strInstructions": "Masak dong gaes",
        "strMealThumb": "anggap aja ada linknya ya",
        "strYoutube": "ini juga ya",
        "strIngredient": "ingredientnya banyak ges",
        "strMeasure": "ini juga banyak",
        "strSource": "link source ceritanya",
        "UserId": "1"
    })
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
})

test('PUT /foods/:id should return error data', async () => {
    let result = await request(app).put('/foods/1').set('Authorization', `Bearer ${token1}`).send({})
    expect(result.status).toBe(400)
    expect(result.body).toHaveProperty('message', 'Data Empty')
})

test('DELETE /foods/:id should return name has been deleted', async () => {
    let result = await request(app).delete('/foods/1').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
    expect(result.body).toHaveProperty('message', 'New Rendang success to delete')
})

test('DELETE /foods/:id should return error data', async () => {
    let result = await request(app).delete('/foods/10').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(404)
    expect(result.body).toHaveProperty('message', 'Data Not Found')
})

test("GET /foods-user/:idUser should return data by id", async () => {
    let result = await request(app).get('/foods-user/1').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
})

test("GET /foods-user/:idUser should return data by id", async () => {
    let result = await request(app).get('/foods-user/4').set('Authorization', `Bearer ${token1}`)
    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Object)
    expect(result.body).toHaveProperty('data', [])
})

afterAll(async () => {
    await Food.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})
