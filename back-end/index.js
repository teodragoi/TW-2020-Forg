const http = require('http');
const path = require('path');
const queryString = require('querystring');
const url = require('url');

const database = require('./db/database');

http.createServer(async (req, res) => {

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
            await database.createConnection();
            if (req.url === '/Courses') {
                const courses = await database.getCourses();
                console.log

                if (courses) {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(courses));
                    database.closeConnection();
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Not found' }));
                    database.closeConnection();
                }
            } else if (req.url.includes('/Courses') && queryParams.courseId) {
                const course = await database.getCourseById(queryParams.courseId);

                if (course) {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(course));
                    database.closeConnection();
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Not found' }));
                    database.closeConnection();
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'appplication/json' });
                res.end(JSON.stringify({ 'Error': 'Unmapped url' }));
                database.closeConnection();
            }
            break;
        case 'POST':
            await database.createConnection();
            let body = '';
            req.on('data', async chunk => {
                body = JSON.parse(chunk.toString());
                if (req.url === '/Courses') {
                    const addResult = await database.createCourse(body);
                    if (addResult.insertedId) {
                        res.writeHead(201, headers);
                        res.end(JSON.stringify({ 'CourseId': addResult.insertedId }));
                        database.closeConnection();
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 'Error': 'An error occured' }));
                        database.closeConnection();
                    }
                }
            });
    }

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');