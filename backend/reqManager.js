const URL = require('url');
const axios = require('axios');
const basePath = process.env.API_URL + "?op=1";



const getProduct = async function(cod)
{
    const reqOpt = {
        method: 'get',
        url: basePath,
        data: {
            barcode: cod
        }
    }
    const {data} = await axios(reqOpt);
    console.log(data)
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

const reqController = async function(end, data)
{
    const {op, cod} = URL.parse(end, true).query;

    let ret;
    if(op=='1')
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