import { openDB } from 'idb';

// ✅ Open the database and wait for it to be ready
const dbPromise = openDB('chatDB', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('messages')) {
      db.createObjectStore('messages', { keyPath: 'id' });
    }
  },
});

// ✅ Save a message (create or update)
export async function saveConversationMessages(id, message, userID) {
  const db = await dbPromise;
  await db.put('messages', { id, message, userID });
}

// ✅ Get all messages
export async function getAllConversationsMessages() {
  const db = await dbPromise;
  return await db.getAll('messages');
}

export async function lastConversationsMessages(){
  try {
    const db = await dbPromise;
    const messages = await db.getAll('messages');
    return messages.slice(-3); 
  } catch (error) {
    console.error('Error getting last messages:', error);
    return []; 
  }
}
export async function deleteAllMessages(){
    const db = await dbPromise;
    await db.clear('messages');
}

