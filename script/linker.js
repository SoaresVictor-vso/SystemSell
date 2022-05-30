const backUrl = "http://localhost:5000/"

const getProduct = async function(cod)
{
    let ret
    try 
    {
        await fetch(backUrl + "req/?cod=" + cod).then((data) => data.json()).then((data) =>{
            ret = data;
         })
    } 
    catch (error) 
    {
        ret = {erro : error};
    }
    
    return ret;
}


