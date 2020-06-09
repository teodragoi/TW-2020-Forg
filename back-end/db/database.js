const { MongoClient } = require('mongodb');
const UpsertCourseModel = require('../models/course.model');
const UserModel = require('../models/user.model');

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const client = new MongoClient(uri);

exports.createCourse = async(body) => {
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

exports.getCourses = async() => {
    return await client.db('GarT').collection('Courses').find().toArray();
}

exports.getCourseById = async(id) => {
    const courses = await client.db('GarT').collection('Courses').find().toArray();

    return courses.find(course => course._id.toString() === id);
}

exports.searchCourse = async(searchString) => {
    const courses = await client.db('GarT').collection('Courses').find().toArray();
    searchString = searchString.substring(1);
    searchString = searchString.substring(0, searchString.length - 1);

    return courses.filter(course => {
        return course.title.includes(searchString) || course.author.includes(searchString)
    });
}

exports.createConnection = async() => {
    try {
        await client.connect();
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

exports.closeConnection = () => {
    client.close();
}

exports.createUser = async(body) => {
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

exports.login = async(body) => {
    const users = await client.db('GarT').collection('Users').find().toArray();

    const user = users.find(user => user.username === body.username);

    if (user.password === body.password) {
        result = user.username;
    } else if (user.password !== body.password) {
        result = { pswError: 'Password is incorrect' };
    } else {
        result = { usrError: 'Username is incorrect' };
    }

    return result;
}

exports.updateCoursesCompleted = async(body) => {
    const query = { username: body.username };
    const newValue = { $set: { coursesCompleted: body.coursesCompleted } };
    const result = await client.db('GarT').collection('Users').updateOne(query, newValue);

    return result;
}

exports.getUserByUsername = async(username) => {

    const users = await client.db('GarT').collection('Users').find().toArray();

    return users.find(user => user.username === username);
}

exports.getUserRanking = async (username) => {
    let users = await client.db('GarT').collection('Users').find().sort({ coursesCompleted: -1 }).toArray();

    for (i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return i + 1;
        }
    }
}