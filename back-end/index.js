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
                }
            });
    }
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');