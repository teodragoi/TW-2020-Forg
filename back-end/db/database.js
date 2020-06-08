const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const client = new MongoClient(uri);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = async () => {
    try {
        await client.connect();

        await listDatabases(client);
    } catch(e) {
        console.log(`Error: ${e}`);
    } finally {
        client.close();
    }
}

