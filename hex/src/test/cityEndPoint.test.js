const request = require('supertest');
const app = require('../server');

describe('Post Cities', () => {
  it('should create a new city', async () => {
    const res = await request(app)
      .post('/api/v1/cities/')
      .send({
        name: 'Madrid',
        country: 'Spain',
        population: '3.8m',
        mapImage:
          'https://a.cdn-hotels.com/gdcs/production133/d1207/7ad2d7f0-68ce-11e8-8a0f-0242ac11000c.jpg',
        history: 'La capi',
        places: ['637f3a9f7b90c8336076dba9'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual('Success');
  });
});
