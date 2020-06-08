const http = require('http');
const path = require('path');
const queryString = require('querystring');
const url = require('url');

const database = require('./db/database');

http.createServer(async (req, res) => {
    await database.createConnection();

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
        "Content-Type": "application/json"

    }

    switch (req.method) {
        case 'GET':
            const parsed = url.parse(req.url);
            const queryParams = queryString.parse(parsed.query);
            if (req.url === '/Courses') {
                const courses = await database.getCourses();
                if (courses) {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(courses));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Not found' }));
                }
            } else if (req.url.includes('/Courses') && queryParams.courseId) {
                const course = await database.getCourseById(queryParams.courseId);

                if (course) {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(course));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Not found' }));
                }
            } else if (req.url.includes('/Courses') && queryParams.searchString) {
                const courses = await database.searchCourse(queryParams.searchString);

                if (courses.length > 0) {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(courses));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Not found' }));
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'appplication/json' });
                res.end(JSON.stringify({ 'Error': 'Unmapped url' }));
            }
            break;
        case 'POST':
            let body = '';
            req.on('data', async chunk => {
                body = JSON.parse(chunk.toString());
                if (req.url === '/Courses') {
                    const addResult = await database.createCourse(body);
                    if (addResult.insertedId) {
                        res.writeHead(201, headers);
                        res.end(JSON.stringify({ 'CourseId': addResult.insertedId }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 'Error': 'An error occured' }));
                    }
                } else if (req.url === '/Users') {
                    const addResult = await database.createUser(body);
                    if (addResult.insertedId) {
                        res.writeHead(201, headers);
                        res.end(JSON.stringify({ 'userId': addResult.insertedId }));
                    } else if (addResult === 'User already exists') {
                        res.writeHead(400, headers);
                        res.end(JSON.stringify({ 'error': addResult }));
                    }
                    else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 'Error': 'An error occured' }));
                    }
                } else if (req.url === '/Users/login') {
                    const user = await database.login(body);

                    if (user.pswError === undefined && user.usrError === undefined) {
                        res.writeHead(200, headers);
                        res.end(JSON.stringify(user));
                    } else {
                        res.writeHead(404, headers);
                        res.end(JSON.stringify(user));
                    }
                }
            });
    }
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');