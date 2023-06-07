const http = require('http');
const initDatabase = require('./dbConfig');
const bodyParser = require('body-parser');
const url = 'mongodb://127.0.0.1:27017/profile-settings'
const port = 3000;
const cors = require('cors');
const { registerHandler, loginHandler, getUser } = require('./userHandler');
initDatabase().then(() => console.log('Database working!'))

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return;
    }
    const { url, method } = req;
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    let userData;
    if (url === '/register' && method === 'POST') {
        try {
            req.on('end', async () => {
                userData = JSON.parse(body);
                user = await registerHandler(userData)
                if (user.accessToken) {
                    res.end(JSON.stringify({ user, error: false }));
                } else {
                    res.end(JSON.stringify({ error: true, errorMessage: user.message }))
                }
            });
        } catch (error) {
            res.statusCode = 400
            console.log('here')
        }
    } else if (url === '/login' && method === 'POST') {
        req.on('end', async () => {
            try {
                userData = JSON.parse(body);
                user = await loginHandler(userData)
                if (user.accessToken) {
                    res.end(JSON.stringify({ user, error: false }));
                } else {
                    throw new Error(user)
                }
            } catch (error) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: true, errorMessage: error.message }))
            }
        });
    } else if(url === '/profile' && method === 'POST'){
        req.on('end', async () => {
            userData = JSON.parse(body);
            const user = await getUser(userData.token)
            res.end(JSON.stringify(user));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found')
    }
})

server.listen(port, () => console.log('Server running at http://localhost:' + port));
