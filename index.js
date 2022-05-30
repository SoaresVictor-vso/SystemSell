const http = require('http');
const fs = require('fs');
const path = require('path');
const reqManager = require('./backend/reqManager');
const { getPath } = require('./backend/fileManager');
const dotenv = require('dotenv');

const $PORT = process.env.PORT || 5000;
dotenv.config();


http.createServer((req,res) => {
    const end = req.url;

    if(end.includes("/req"))
    {
        console.log("requiring at: " + end);
        reqManager.reqController(end).then((ret) => res.end(JSON.stringify(ret)))
    }
    else
    {
        return loadFile(getPath(end), res);
    }

}).listen($PORT, console.log("Server up at port " + $PORT));

function loadFile(filePath, res)
{

    if(filePath != "") 
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
    
}
