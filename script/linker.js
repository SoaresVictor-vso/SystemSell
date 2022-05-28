const backUrl = "http://localhost:5000/"

async function getProduct(cod)
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
        ret = JSON.stringify({erro : "failOnGetCad"})
    }
    
    return ret;
}

