const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req,res) => {
    let fileName;
    if(req.url === '/' || req.url ==='')
    {
        fileName = "index.html";
    }
    else
    {
        fileName = req.url;
    }

    
    let filePath;
    const extname = path.extname(fileName);
    const allowedFileTypes = ['','.html', '.css', '.js', '.json'];
    const allowed = allowedFileTypes.find(item => item == extname)


    if(extname == allowedFileTypes[1])
    {
        filePath = path.join(__dirname, 'system', fileName);
    } 
    else if(extname == allowedFileTypes[0])
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
    

    fs.readFile(
        filePath,
        (err, content) => {
            if(err) throw err;
            res.end(content);
        }
    )
    console.log("Server up")

}).listen(5000);