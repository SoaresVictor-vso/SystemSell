const path = require('path');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const apiUrl = process.env.API_URL;

const getRole = function(token)
{
    const finalUrl = apiUrl + "/?op=22"
    const body = {"token":token};
    try
    {
        axios.post(finalUrl , JSON.stringify(body))
        .then((r) => r.data)
        .then((r) => {
            console.log(r)
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

const getPath = function(end)
{
    return setPath(getBasePath(), getName(end));
}

const getName = function(end)
{
    let fileName;

    if(end === '/' || end ==='')
    {
        fileName = "login.html";
    }
    else
    {
        fileName = end;
    }
    return fileName;
}

const setPath = function (basePath, fileName)
{
    const allowedFileTypes = ["", ".html", ".css", ".js", ".ico", ".png"]
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
    
    //console.log(filePath);
    return filePath;
}

const getBasePath = function()
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

    return basePath;
}

module.exports = { getPath, getName, setPath, getBasePath }