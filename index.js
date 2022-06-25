const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url');
//const reqManager = require('./backend/reqManager');
const { getPath } = require('./backend/fileManager');
const dotenv = require('dotenv');
//const { application } = require('express');
dotenv.config();

const $PORT = process.env.PORT || 5000;



http.createServer(async (req,res) => {
    const end = req.url;
    console.log(end)
    
    if(end.includes("api"))
    {
        return res.end(JSON.stringify({"url":process.env.API_URL}));
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
