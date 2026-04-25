const request = require('supertest');
const app = require('../server');

describe('CivicPathAI Backend API Tests', () => {

  describe('GET /api/voter-status', () => {
    it('should return registered status for a valid EPIC', async () => {
      const res = await request(app).get('/api/voter-status?epic=ABC1234567');
      expect(res.statusCode).toEqual(200);
      expect(res.body.registered).toBe(true);
      expect(res.body.voter.name).toBe('Rahul Sharma');
    });

    it('should return not registered for an invalid EPIC', async () => {
      const res = await request(app).get('/api/voter-status?epic=UNKNOWN123');
      expect(res.statusCode).toEqual(200);
      expect(res.body.registered).toBe(false);
    });

    it('should return 400 if EPIC is missing', async () => {
      const res = await request(app).get('/api/voter-status');
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('EPIC parameter required');
    });
  });

  describe('GET /api/booths', () => {
    it('should return booth info for a valid PIN code', async () => {
      const res = await request(app).get('/api/booths?query=110001');
      expect(res.statusCode).toEqual(200);
      expect(res.body.found).toBe(true);
      expect(res.body.booth.address).toContain('110001');
    });

    it('should return booth info for a valid registered EPIC', async () => {
      const res = await request(app).get('/api/booths?query=ABC1234567');
      expect(res.statusCode).toEqual(200);
      expect(res.body.found).toBe(true);
      expect(res.body.booth.name).toBe('Govt. Primary School, Sector 4');
    });

    it('should return not found for an invalid query', async () => {
      const res = await request(app).get('/api/booths?query=NOTFOUND123');
      expect(res.statusCode).toEqual(200);
      expect(res.body.found).toBe(false);
    });
  });

  describe('POST /api/documents', () => {
    it('should return not eligible if age is under 18', async () => {
      const res = await request(app)
        .post('/api/documents')
        .send({ age: 17, status: 'first-time' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.eligible).toBe(false);
    });

    it('should return Form 6 for a first-time voter 18 or older', async () => {
      const res = await request(app)
        .post('/api/documents')
        .send({ age: 20, status: 'first-time' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.eligible).toBe(true);
      expect(res.body.documents[0].description).toContain('Form 6');
    });

    it('should return Form 8 for a moved voter', async () => {
      const res = await request(app)
        .post('/api/documents')
        .send({ age: 30, status: 'moved' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.eligible).toBe(true);
      expect(res.body.documents[0].description).toContain('Form 8');
    });
  });

});
