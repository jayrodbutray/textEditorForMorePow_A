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
    const request = store.put({ id: null, value: content });
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          const addedId = event.target.result;
          console.log('Content added to the database with ID:', addedId);
            resolve(addedId.toString());
        };
        request.onerror = (event) => {
          console.error('Error adding content to the database:', event.target.error);
          reject(event.target.error);
        };
      });
    
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
    const request = store.getAll();
    const result = await request;
    console.log('Content retrieved from the database:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    throw error;
  }
};

// Initialize the database
initdb();

