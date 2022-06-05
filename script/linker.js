const backUrl = window.location.href;
let parts = backUrl.split("/", [4]);
console.log(parts)


const getProduct = async function(cod)
{
    let ret

    //console.log('===>' + jBody);

    try 
    {
        await fetch(parts[0] + "//" + parts[2] + "/req/?op=1&cod=" + cod)
        .then((data) => data.json())
        .then((data) =>{
            ret = data;
        })
    } 
    catch (error) 
    {
        ret = {erro : error};
    }
    
    return ret;
}


