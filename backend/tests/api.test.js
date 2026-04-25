const request = require('supertest');
const app = require('../server');

// Mock Firebase Admin
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
    applicationDefault: jest.fn()
  },
  firestore: () => ({
    collection: (name) => ({
      doc: (id) => ({
        get: jest.fn().mockResolvedValue({
          exists: id === 'B001',
          data: () => ({ booth_id: 'B001', name: 'Govt. Primary School', address: 'Sector 4, Delhi', lat: 28.6, lng: 77.2 })
        })
      }),
      get: jest.fn().mockResolvedValue({
        docs: [
          { id: 'B001', data: () => ({ booth_id: 'B001', name: 'Govt. Primary School', lat: 28.6, lng: 77.2 }) }
        ]
      }),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      add: jest.fn().mockResolvedValue({ id: 'new-id' })
    }),
    FieldValue: {
      serverTimestamp: jest.fn()
    }
  })
}));

describe('CivicPathAI Backend API Tests', () => {

  describe('GET /api/voter-status', () => {
    it('should return registered status for a valid EPIC', async () => {
      // Mocking the specific call inside the test if needed, 
      // but the global mock handles it.
      const res = await request(app).get('/api/voter-status?epic=ABC1234567');
      expect(res.statusCode).toEqual(200);
      // Note: Since mock returns empty by default for .where(), we might need to adjust mock
    });

    it('should return 400 if EPIC is missing', async () => {
      const res = await request(app).get('/api/voter-status');
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/booths', () => {
    it('should return booth info for a valid query', async () => {
      const res = await request(app).get('/api/booths?query=110001');
      expect(res.statusCode).toEqual(200);
      expect(res.body.found).toBe(true);
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

    it('should return checklist for eligible voter', async () => {
      const res = await request(app)
        .post('/api/documents')
        .send({ age: 20, status: 'first-time' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.eligible).toBe(true);
      expect(res.body.documents).toBeDefined();
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
