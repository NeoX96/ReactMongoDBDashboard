import * as Realm from "realm-web";

const app = new Realm.App({ id: "data-ngpoq" });
const credentials = Realm.Credentials.apiKey("2Xyb6zk9mkSNb1knmcAEdX1GCahmGhyi3YMFM8qo9YW86hoVEigf2GGTe8iqNpG8");


export async function getMongoCollection() {
  const user = await app.logIn(credentials);
  const mongo = user.mongoClient("DBDatabase");
  const collection = mongo.db("Top10").collection("10Shops");
  return collection;
}

export async function watchCollection(onChange) {

    const collection = await getMongoCollection();
    const changeStream = await collection.watch();

    for await (const event of changeStream) {
      const updatedShop = await collection.findOne({ _id: event.documentKey._id });
      if (typeof onChange === "function") {
        onChange(updatedShop);
      }
      console.log("Data changed:", updatedShop);
    }

    return () => {
      changeStream.close();
    }
}

export async function realmLogin() {
  try {
    const user = await app.logIn(credentials);

    if (user.id !== app.currentUser?.id) {
      console.error("User is not logged in");
    }

    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}


export async function getShopsData() {

  const collection = await getMongoCollection();
  const shopsData = await collection.find({}, { limit: 10 }).toArray(); 

  return shopsData;
}