const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url');
const reqManager = require('./backend/reqManager');
const { getPath } = require('./backend/fileManager');
const dotenv = require('dotenv');
dotenv.config();

const $PORT = process.env.PORT || 5000;



http.createServer(async (req,res) => {
    const end = req.url;
    
    if(end.includes("/req"))
    {
        
        //----------------------------------------------------------------------
        //buffer do body da requisição
        const body = [];
        let data;

        //adiciona cada parte do corpo da requisição no buffer
        try
        {    
            for await (const chunk of req) {
                body.push(chunk);
                console.log(data)
            }
            data = JSON.parse(Buffer.concat(body));
        }
        catch(err)
        {
            console.log("---" + err)
        }
        //----------------------------------------------------------------------
        
        reqManager.reqController(end, data).then((ret) => {
            return res.end(JSON.stringify(ret))
        })
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
