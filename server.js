const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const PORT = process.env.PORT || 3000;

class Server {
    constructor(port) {
        this.port = port;
        this.utils = utils;
        this.server = http.createServer(this.handleRequest);    
    }

    createServer() {
        this.server.listen(this.port);
        console.log('Server is running on port ' + this.port);
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;
        
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (pathname === '/COMP4537/labs/3/getDate/') {
            utils.handleGetDate(req, res, query);
        }
        else if (pathname === '/COMP4537/labs/3/writeFile/') {
            utils.handleWriteFile(req, res, query);
        }
        else if (pathname.startsWith('/COMP4537/labs/3/readFile/')) {
            utils.handleReadFile(req, res, query, pathname);
        }
        else {
            res.writeHead(404);
            res.end('<p>404 - Endpoint not found</p>');
        }


    }
}


const server = new Server(PORT);
server.createServer();
