const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const reqManager = require('./backend/reqManager');

http.createServer((req,res) => {
    let fileName = "";
    let isReq = false;
    if(req.url === '/' || req.url ==='')
    {
        fileName = "index.html";
    }
    else if(req.url.includes("/req"))
    {
        isReq = true;
        console.log("Rammus")
    }
    else
    {
        fileName = req.url;
    }
   

    
    let filePath;
    const extname = path.extname(fileName);
    const allowedFileTypes = ['','.html', '.css', '.js', '.json'];
    const allowed = allowedFileTypes.find(item => item == extname)


    if(extname == allowedFileTypes[1] && !isReq)
    {
        filePath = path.join(__dirname, 'system', fileName);
    } 
    else if(extname == allowedFileTypes[0] && !isReq)
    {
        fileName += '.html';
        filePath = path.join(__dirname, 'system', fileName);
    }
    else if(!allowed)
    {
        return
    }
    else
    {
        filePath = path.join(__dirname, fileName);
    }
    
    if(!isReq)
    {
        fs.readFile(
            filePath,
            (err, content) => {
                if(err) console.log(err);
                res.end(content);
            }
        )
    }
    reqManager.msg();
    

    //getData();
    

}).listen(5000, console.log("Server up"));

async function getData()
{
    const response = await axios('http://localhost:3000/?op=0&cod=005');
    //console.log(response.data);
}

