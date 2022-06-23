const backUrl = window.location.href;
const token = localStorage.getItem('jwt');
let apiUrl;
let parts = backUrl.split("/", [4]);

function send()
{
    apiUrl = loadApiUrl();



    

}

const loadApiUrl = async function()
{
    let ret;
    const url = parts[0] + "//" + parts[2] + "/api";
    try
    {
        await fetch(url, {method: "GET"})
        .then((r) => r.json()).then((r) => ret = r.url)
    }
    catch (err)
    {
        console.error("IMPOSSIVEL CONTECTAR AO SERVIDOR, RECARREGUE ESTA PAGINA");
    }
    if(ret != null)
    {
        return ret;
    }
    return "http://localhost:3000";
}

const fetchQuery = function(query)
{
    let ret
    const reqBody = {
        "token":token,
        "query":"SELECT * FROM produto"
    }
    try 
    {
        
        //console.log(reqBody)

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