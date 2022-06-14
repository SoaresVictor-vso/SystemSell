let jwt;

const login = async function ()
{
    
    const url = await loadApiUrl();
    const body = setLoginCredentials();
    console.log(body)
    await fetch(url + "/?op=400", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: body
    })
    .then((r) => r.json())
    .then((r) => {
        
        if(r.jwt == null)
        {
            jwt = r.stts
        }
        else
        {
            jwt = r.jwt;
            window.location.href = "/index"
        }
    })
}

const setLoginCredentials = function ()
{
    const user = document.getElementById("Username").value;
    const pass = document.getElementById("Password").value;
    const loginObj = {
        "user":user,
        "pass": pass
    }
    return JSON.stringify(loginObj);
}