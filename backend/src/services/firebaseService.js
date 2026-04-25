const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
// In production (Google Cloud Run), it can auto-initialize if the service account is attached.
// Otherwise, use a service account key or env vars.
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Fallback for local dev if default credentials available
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
} catch (error) {
  console.warn('Firebase initialization failed. Using mock mode if FIREBASE_MOCK=true', error.message);
}

const db = admin.firestore();

// Generic helper to get a document by ID
const getDoc = async (collection, id) => {
  const doc = await db.collection(collection).doc(id).get();
  return doc.exists ? doc.data() : null;
};

// Generic helper to get all documents from a collection
const getAllDocs = async (collection) => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Query voters by EPIC number
const getVoterByEpic = async (epic) => {
  const snapshot = await db.collection('voters')
    .where('epic_number', '==', epic.toUpperCase())
    .limit(1)
    .get();
  return snapshot.empty ? null : snapshot.docs[0].data();
};

// Add a reminder
const addReminder = async (reminder) => {
  return await db.collection('reminders').add({
    ...reminder,
    created_at: admin.firestore.FieldValue.serverTimestamp()
  });
};

module.exports = {
  db,
  getDoc,
  getAllDocs,
  getVoterByEpic,
  addReminder
};
