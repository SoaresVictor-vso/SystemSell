const URL = require('url');
const axios = require('axios');
const basePath = API_URL + "?op=0&cod=";
console.log(basePath)

const getProduct = async function(cod)
{
    
    
    const {data} = await axios(basePath + cod)
    return data;
    
}

const preGetProduct = async function(cod)
{
    let product;
    try 
    {
        product = await getProduct(cod);
    } 
    catch (error)
    {
        console.log(error)
        product = {erro : "requestFailed"};
    }
    return product;
}

const reqController = async function(url)
{
    const {cod, op} = URL.parse(url, true).query;
    let ret;
    if(cod && (!op || op==='0'))
    {
        ret = preGetProduct(cod)
    }
    //else if op != 0
    else
    {
        ret = {erro : "invalidOperation"};
    }

    return ret;
}

module.exports = { reqController, getProduct, preGetProduct }