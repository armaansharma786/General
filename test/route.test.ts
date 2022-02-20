import supertest from 'supertest';
import app from './../src/app';

test('Missing parameters', async () => {
    const response = await supertest(app).get('/cities').send({
    }).expect(400)
})

test('Successful request', async () => {
    const response = await supertest(app).get('/cities?lat=49.48&lng=18.46').send({

    }).expect(200)
    expect(response.body).toEqual(
        [
            {
              "id": 3068797,
              "name": "Ostravice"
            }
          ]
    )
})

test('Not Found', async () => {
    const response = await supertest(app).get('/cities/234').send({
    }).expect(404)
    expect(response.body.code).toEqual("NotFoundError")
})

test('Successfull request', async () => {
    const response = await supertest(app).get('/cities/2814795').send({
    }).expect(200)
    expect(response.body).toEqual(
        {
            "id": 2814795,
            "name": "Waldsee",
            "lat": 49.395279,
            "lng": 8.44028
          } 
    )
})

test('City Not Found to check weather', async () => {
    const response = await supertest(app).get('/cities/28195/weather').send({
    }).expect(404)
    expect(response.body.code).toEqual("NotFoundError")
})

test('City Not Found to check weather', async () => {
    const response = await supertest(app).get('/cities/2814795/weather').send({
    }).expect(200)
})