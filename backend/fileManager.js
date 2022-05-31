const path = require('path');
const fs = require('fs');


const getPath = function(end)
{
    let basePath = String(__dirname);

    if(basePath.includes("/backend"))
    {
        basePath = basePath.split("/backend", 1)[0];
    }
    else if(basePath.includes("\\backend"))
    {
        basePath = basePath.split("\\backend", 1)[0];
    }
    

    
    return setPath(basePath, getName(end));
}

const getName = function(end)
{
    let fileName;

    if(end === '/' || end ==='')
    {
        fileName = "index.html";
    }
    else
    {
        fileName = end;
    }
    return fileName;
}

const setPath = function (basePath, fileName)
{
    const allowedFileTypes = ["", ".html", ".css", ".js", ".ico"]
    const extension = path.extname(fileName);
    const allowed = allowedFileTypes.find(item => item == extension)

    let filePath = "";

    if(extension == allowedFileTypes[1] )
    {
        filePath = path.join(basePath, 'system', fileName);
    } 
    else if(extension == allowedFileTypes[0] )
    {
        fileName += '.html';
        filePath = path.join(basePath, 'system', fileName);
    }
    else if(!allowed)
    { 
        filePath = "";
    }
    else
    {
        filePath = path.join(basePath, fileName);
    }
    
    console.log(filePath);
    return filePath;
}

module.exports = { getPath, getName, setPath }