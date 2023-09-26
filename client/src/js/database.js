import { openDB } from 'idb';

const initdb = async () => {
  try {
    const jateDb = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          // Add any necessary indexes here
          console.log('jate database created');
        }
      },
    });

    console.log('jate database opened successfully');
    return jateDb;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

export const putDb = async (content) => {
  try {
    const jateDb = await initdb();
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    return await request;
    
  } catch (error) {
    console.error('Error adding content to the database:', error);
    throw error;
  }
};

export const getDb = async () => {
  try {
    const jateDb = await initdb();
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    console.log('Content retrieved from the database:', result);
    if (!result) return ""
    return result.value;

  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    throw error;
  }
};

// Initialize the database
initdb();

