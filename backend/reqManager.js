const URL = require('url');
const axios = require('axios');



const getProduct = async function(cod)
{
    console.log('http://localhost:3000/?op=0&cod=' + cod)
    const {data} = await axios('http://localhost:3000/?op=0&cod=' + cod)
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