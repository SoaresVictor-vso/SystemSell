const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url');
//const reqManager = require('./backend/reqManager');
const { getPath, getBasePath } = require('./backend/fileManager');
const dotenv = require('dotenv');
//const { application } = require('express');
dotenv.config();

const $PORT = process.env.PORT || 5000;



http.createServer(async (req,res) => {
    const end = req.url;
    console.log(end)
    
    if(end.includes("api"))
    {
        const url = process.env.API_URL;
        console.log(">>>" + url)
        return res.end(JSON.stringify({"url":url}));
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
        
        fs.readFile(filePath, (err, content) => {
            if(err) {
                try
                {
                    let file = path.join(getBasePath(), "/system/erro404.html");
                    console.log(file)
                    fs.readFile(file , (err, content) => {
                        if(err) {
                            throw err;
                        }
                        else
                        {
                            return res.end(content);
                        }
                    })
                }
                catch (error)
                {
                    return res.end("<h1>ERRO NO SERVIDOR!</h1>");
                }
                    }
                    else
                    {
                        return res.end(content);
                    }
                })
        
    }
    
}
