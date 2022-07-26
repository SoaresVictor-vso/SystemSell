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
    }
    catch (err)
    {
        console.log(err);
    }
    if(ret != null)
    {
        return ret;
    }
    else
    {
        console.alert("No API address, using default localhost:3000");
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

const getFullProduct = async function(cod)
{
    if(apiUrl == null)
    {
        apiUrl = await loadApiUrl();
    }
    let ret

    try 
    {
        let fullReqBody = {
            "token":token,
            "barcode":cod
        }

        await fetch(apiUrl + "/req/?op=3", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(fullReqBody)
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

const alterProduct = async function(prod)
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
            "prod":{
                "barcode": prod.barcode,
                "description":prod.description,
                "buyprice":prod.buyPrice,
                "sellprice":prod.sellPrice,
                "margin":prod.margin,
                "quant":prod.quant
            }
        }

        await fetch(apiUrl + "/req/?op=2", {
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


    {}
}

const find = async function(name)
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
            "name":name
        }

        await fetch(apiUrl + "/req/?op=4", {
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

const buy = async function(prodList)
{
    try 
    {
        let reqBody = {
            "token":token,
            "list":prodList
        }

        await fetch(apiUrl + "/req/?op=5", {
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
}


