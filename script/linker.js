const backUrl = window.location.href;
let apiUrl;
let parts = backUrl.split("/", [4]);
console.log(parts)


const loadApiUrl = async function()
{
    let ret;
    const url = parts[0] + "//" + parts[2] + "/api";
    console.log(url)
    try
    {
        await fetch(url, {method: "GET"})
        .then((r) => r.json()).then((r) => ret = r.url)
    }
    catch (err)
    {
        console.log("IMPOSSIVEL CONTECTAR AO SERVIDOR, RECARREGUE ESTA PAGINA");
    }
    if(ret != null)
    {
        return ret;
    }
    return "http://localhost:3000";
}

const getProduct = async function(cod)
{
    if(apiUrl == null)
    {
        apiUrl = await loadApiUrl();
        console.log(apiUrl)
    }
    let ret

    //console.log('===>' + jBody);

    try 
    {
        
        let reqBody = {
            "token":"token",
            "barcode":cod
        }
        console.log(reqBody)

        await fetch(apiUrl + "/req/?op=1", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(reqBody)
        }).then((r) => r.json()).then((r) => {
            ret = r;
        })
        
    } 
    catch (error) 
    {
        ret = {erro : error};
    }
    
    return ret;
}


