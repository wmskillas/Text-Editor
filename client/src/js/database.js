import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);
  const rw = jateDb.transaction("jate", "readwrite");
  const store = rw.objectStore("jate");
  const put = store.put({ jate: content });
  const result = await put;
  console.log("Input Saved to DB", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const ro = jateDb.transaction("jate", "readonly");
  const store = ro.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("Content Pulled from DB", result);
};

initdb();
