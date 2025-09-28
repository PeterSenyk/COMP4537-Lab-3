const messages = require('../lang/messages/en/user');
const fs = require('fs');

class Utils {
    static getDate() {
        const now = new Date();
        return now.toString();
    }
    
    static handleGetDate(res, query) {
        const name = query.name || messages.noName;

        const serverTime = Utils.getDate();
        const message = messages.greet.replace('%1', name).replace('%2', serverTime);
        res.end(message);
    }

    static handleWriteFile(res, query) {
        const text = query.text;
        
        if (!text) {
            res.writeHead(400);
            res.end(messages.noText);
            return;
        }

        const filename = 'file.txt';
        
        try {
            fs.appendFileSync(filename, text + '\n');
            
            res.writeHead(200);
            res.end(messages.success.replace('%1', text).replace('%2', filename));
        } catch (error) {
            res.writeHead(500);
            res.end(messages.error.replace('%1', error.message));
        }
    }

    static handleReadFile(res, pathname) {
        const pathParts = pathname.split('/');
        const filename = pathParts[pathParts.length - 1] || 'file.txt';
        
        try {
            if (!fs.existsSync(filename)) {
                res.writeHead(404);
                res.end(messages.notFound.replace('%1', filename));
                return;
            }
            
            const fileText = fs.readFileSync(filename, 'utf8');
            
            res.writeHead(200);
            res.end(`<pre>${fileText}</pre>`);
        } catch (error) {
            res.writeHead(500);
            res.end(messages.errorReadingFile.replace('%1', error.message));
        }
    }
}

module.exports = Utils;
