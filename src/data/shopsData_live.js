import * as Realm from "realm-web";

const APP_ID = "data-uilqj";
const API_KEY = "7PodJEFumzYtvIBgsWkiBMp5N1ifzHkrRMO9XTvRSxVBH5TIq5kJdXhLxE7RKWKM";
const DATA_SOURCE = "DBDatabase";
const DATABASE_NAME = "Top10";
const COLLECTION_NAME = "10Shops";


const app = new Realm.App(APP_ID);
const credentials = Realm.Credentials.apiKey(API_KEY);

/**
 * Loggt einen Benutzer bei der Realm-Instanz ein.
 *
 * @returns {object} Der eingeloggte Benutzer.
 */
async function realmLogin() {
  try {
    // Überprüfe, ob app definiert ist
    if (!app) {
      console.error("app is not defined");
      return;
    }

    const user = await app.logIn(credentials);

    if (user.id !== app.currentUser?.id) {
      console.error("User is not logged in");
    }

    console.log("User logged in:", user);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}


async function getMongoCollection() {
  const user = app.currentUser ?? await realmLogin();

  const mongo = user.mongoClient(DATA_SOURCE);
  const db = mongo.db(DATABASE_NAME);
  if (!db) {
    throw new Error(`Failed to connect to database ${DATABASE_NAME}`);
  }
  const collection = db.collection(COLLECTION_NAME);

  if (!collection) {
    throw new Error(`Failed to connect to collection ${COLLECTION_NAME}`);
  }

  return collection;
}


/**
 * Watch a MongoDB collection for changes and call the onChange function when a document changes.
 * @param {function} onChange - Function to call when a document changes.
 * @returns {function} Function to stop watching the collection.
 */
export async function watchCollection(onChange) {
  try {
    // Get the MongoDB collection.
    const collection = await getMongoCollection();
    
    // Create a change stream for the collection.
    const changeStream = await collection.watch();

    // Listen for changes in the collection.
    for await (const event of changeStream) {
      // Get the updated document from the collection.
      const updatedDocument = await collection.findOne({ _id: event.documentKey._id });

      // Call the onChange function if it is defined.
      if (typeof onChange === "function") {
        onChange(updatedDocument);
      }

      // Log that data has changed.
      console.log("Data changed:", updatedDocument);
    }

    // Return a function to stop watching the collection.
    return () => {
      changeStream.close();
    };
  } catch (err) {
    console.error("Failed to watch collection", err);
  }
}



/**
 * Gibt die Daten der MongoDB-Collection zurück und sortiert sie nach Revenue absteigend.
 *  
 * @returns {array} Ein Array mit den sortierten Daten der MongoDB-Collection. ShopName und Revenue
 *  
 */
export async function getShopRevenuePieBarChart() {
  const collection = await getMongoCollection();
  const data = await collection.aggregate([
    { $sort: { Revenue: -1 } },
    {
      $project: {
        _id: 0,
        id: "$ShopName",
        label: "$ShopName",
        value: "$Revenue",
      },
    },
  ]);

  console.log("DataforCharts: ", data);

  return data;
}



/**
 * 
 * @returns {number} Summe der Revenue
 */
export async function getSumOfRevenue() {
  const collection = await getMongoCollection();

  const data = await collection.aggregate([
    { $group: { _id: null, sum: { $sum: "$Revenue" } } },
  ]);

  return data[0].sum;
}

/**
 * 
 * @returns {Array} ShopName Country Revenue Year, sortiert nach Revenue absteigend
 *
 */
export async function getShopsData() {
  const collection = await getMongoCollection();

  const data = await collection.aggregate([
    { $project: { ShopName: 1, Country: 1, Revenue: 1, Year: 1 } },
    { $sort: { Revenue: -1 } },    
  ]);

  console.log("DataShops:", data);
  return data;
}