const { MongoClient } = require('mongodb');
const UpsertCourseModel = require('../models/course.model');

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const client = new MongoClient(uri);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    const list = databasesList.databases.map(db => db.name);

    return databasesList.databases.map(db => db.name);
};

exports.createCourse = async (body) => {
    const newCourse = new UpsertCourseModel(
        body.image,
        body.title,
        body.author,
        body.description,
        body.rating,
        body.materials,
        body.tasks
    );

    const result = await client.db('GarT').collection('Courses').insertOne(newCourse);
    return result;
}

exports.createConnection = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

exports.closeConnection = () => {
    client.close();
}

exports.databaseList = async () => {
    return await listDatabases(client);
}
