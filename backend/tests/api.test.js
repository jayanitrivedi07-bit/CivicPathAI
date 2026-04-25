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

    it('should return not registered for an unknown EPIC', async () => {
      const res = await request(app).get('/api/voter-status?epic=NOTFOUND123');
      expect(res.statusCode).toEqual(200);
      expect(res.body.registered).toBe(false);
    });

    it('should return 400 if EPIC is missing', async () => {
      const res = await request(app).get('/api/voter-status');
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined(); // express-validator format
    });
  });

  describe('GET /api/booths', () => {
    it('should return booth info for a valid PIN code', async () => {
      const res = await request(app).get('/api/booths?query=110001');
      expect(res.statusCode).toEqual(200);
      expect(res.body.found).toBe(true);
      expect(res.body.booth.address).toContain('Sector 4');
    });

    it('should return not found for an invalid query', async () => {
      const res = await request(app).get('/api/booths?query=UNKNOWN');
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

    it('should return Form 6 for a first-time voter', async () => {
      const res = await request(app)
        .post('/api/documents')
        .send({ age: 20, status: 'first-time' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.eligible).toBe(true);
      expect(JSON.stringify(res.body.documents)).toContain('Form 6');
    });
  });

  describe('POST /api/reminders', () => {
    it('should save reminders for valid Indian phone number', async () => {
      const res = await request(app)
        .post('/api/reminders')
        .send({ state: 'Delhi', phone: '9876543210', rem1day: true, remMorning: true });
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 400 for invalid phone number', async () => {
      const res = await request(app)
        .post('/api/reminders')
        .send({ state: 'Delhi', phone: '123', rem1day: true, remMorning: true });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Efficiency & Caching', () => {
    it('should return cached:true on second request for same EPIC', async () => {
      const epic = 'ABC1234567';
      await request(app).get(`/api/voter-status?epic=${epic}`);
      const res = await request(app).get(`/api/voter-status?epic=${epic}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.cached).toBe(true);
    });
  });

  describe('Google Services Integration', () => {
    it('should provide a valid Google Maps directions URL', async () => {
      const res = await request(app).get('/api/booths?query=110001');
      expect(res.statusCode).toEqual(200);
      expect(res.body.booth.google_maps_url).toContain('google.com/maps/dir/');
    });
  });

  describe('Health Check', () => {
    it('should return UP status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('UP');
    });
  });

});
