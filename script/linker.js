const backUrl = window.location.href;
const token = localStorage.getItem('jwt');
let apiUrl;
let parts = backUrl.split("/", [4]);


const loadApiUrl = async function()
{
    let ret;
    const url = parts[0] + "//" + parts[2] + "/api";
    try
    {
        await fetch(url, {method: "GET"})
        .then((r) => r.json()).then((r) => ret = r.url)
        console.log(r.url)
    }
    catch (err)
    {
        console.log(err);
    }
    if(ret != null)
    {
        console.log(ret);
        return ret;
    }
    else
    {
        console.log("--");
    }
}

const getProduct = async function(cod)
{
    if(apiUrl == null)
    {
        apiUrl = await loadApiUrl();
    }
    let ret

    try 
    {
        let reqBody = {
            "token":token,
            "barcode":cod
        }
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
            console.log(r)
        })
        
    } 
    catch (error) 
    {
        ret = {erro : error};
    }
    
    return ret;
}


