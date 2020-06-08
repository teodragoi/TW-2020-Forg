const http = require('http');
const path = require('path');

const database = require('./db/database');

http.createServer(async (req, res) => {


    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    switch (req.method) {
        case 'GET':
            await database.createConnection();
            if (req.url === '/listDabases') {
                const dbLists = await database.databaseList();

                if (dbLists !== undefined) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'Response': dbLists }));
                    database.closeConnection();
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'err': 'Some random error' }));
                    database.closeConnection();
                }
            } else {
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
                        res.writeHead(201, { 'Content-Type': 'application/json' });
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

    // fs.readFile(filePath, (err, content) => {
    //     if (err) {
    //         if(err.code == 'ENOENT') {
    //             fs.readFile('./404.html', (err, content) => {
    //                 res.writeHead(404, { 'Content-Type': 'text/html' });
    //                 res.end(content, 'utf-8');
    //             });
    //         }
    //         else {
    //             res.writeHead(500);
    //             res.end('Sorry, check with the site admin for error: '+err.code+' ..\n');
    //         }
    //     }
    //     else {
    //         res.writeHead(200, { 'Content-Type': contentType });
    //         res.end(content, 'utf-8');
    //     }
    // });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');