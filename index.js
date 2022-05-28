const http = require('http');
const fs = require('fs');
const path = require('path');
const reqManager = require('./backend/reqManager');
const { getPath } = require('./backend/fileManager');

http.createServer((req,res) => {
    const end = req.url;

    if(end.includes("/req"))
    {
        reqManager.reqController(end).then((ret) => res.end(JSON.stringify(ret)))
    }
    else
    {
        return loadFile(getPath(end), res);
    }

}).listen(5000, console.log("Server up"));

function loadFile(filePath, res)
{
    try
    {
        fs.readFile(filePath, (err, content) => {
            if(err) {
                throw err;
                return;
            }
            else
            {
                return res.end(content);
            }
        })
    }
    catch (error)
    {
        return console.log(error);
        
    }
}
