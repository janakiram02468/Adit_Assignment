const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Auth API', () => {
  beforeAll(async () => {
    if (!process.env.MONGODB_URI) {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/taskmanager_test';
    }
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'test_secret';
    }
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('GET /api/health returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
