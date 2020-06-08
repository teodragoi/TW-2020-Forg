const { MongoClient } = require('mongodb');
const UpsertCourseModel = require('../models/course.model');
const UserModel = require('../models/user.model');

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

exports.getCourses = async () => {
    return await client.db('GarT').collection('Courses').find().toArray();
}

exports.getCourseById = async (id) => {
    const courses = await client.db('GarT').collection('Courses').find().toArray();

    return courses.find(course => course._id.toString() === id);
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

exports.createUser = async (body) => {
    const newUser = new UserModel(
        body.username,
        body.password,
        body.admin,
        body.coursesCompleted
    );

    const users = await client.db('GarT').collection('Users').find().toArray();

    const user = users.find(user => user.username === newUser.username);

    let result;

    if (user) {
        result = 'User already exists';
    } else {
        result = await client.db('GarT').collection('Users').insertOne(newUser);
    }

    return result;
}

exports.getUserByUsername = async (username) => {

    const users = await client.db('GarT').collection('Users').find().toArray();

    return users.find(user => `"${user.username}"` === username);
}