const nextPage = "/index";
const headerFetch = {'Accept': 'application/json', 'Content-Type': 'application/json'}
let jwt;
let url;
const  inputFields = ["Username", "Password", "LoginButton"];

document.addEventListener('DOMContentLoaded', async () => {
    
    url = await loadApiUrl()
    jwt = await localStorage.getItem('jwt')
    
    checkToken(jwt).then((r) => {
        if(r)
        {
            window.location.href = nextPage;
        }
    })
        
})

document.addEventListener('keyup', (e) => {
    if(e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        const active = document.activeElement.id;
        let activeIndex = inputFields.indexOf(active);
        if(activeIndex > inputFields.length - 2)
        {
            activeIndex = -1
        }

        document.getElementById(inputFields[activeIndex + 1]).focus();
        
    }
});

const checkToken = async function(token)
{
    let ret;
    if(token != null)
    {
        const rbody = {"token":token}
        try
        {
            await fetch(url + "/?op=21", {
                method: "POST",
                headers: headerFetch,
                body: JSON.stringify(rbody)
            })
            .then((r) => r.json()).then((r) => {
                console.log("!!!" + JSON.stringify(r))
                if(r.stts == "logged")
                {
                    ret = true;
                }
                else
                {
                    ret = false;
                }
            })
        }
        catch(err)
        {
            console.log(err)
            ret = false;
        }
    }
    else
    {
        ret = false
    }

    return ret;
}

const login = async function ()
{
    changeLoading(true);
    const rbody = setLoginCredentials();
    await fetch(url + "/?op=20", {
        method: "POST",
        headers: headerFetch,
        body: rbody
    })
    .then((r) => r.json())
    .then((r) => {
        
        if(r.jwt == null)
        {
            changeLoading(false);
            alertCredentials();
        }
        else
        {
            localStorage.setItem('jwt', r.jwt)
            jwt = r.jwt;
            window.location.href = nextPage
        }
    })
}

const setLoginCredentials = function ()
{
    const user = document.getElementById("Username").value;
    const pass = document.getElementById("Password").value;
    const loginObj = {
        "user":user,
        "pass":pass
    }
    return JSON.stringify(loginObj);
}

const alertCredentials = function()
{
    document.getElementById('AlertCredentials').classList.remove("hide");
}

const changeLoading = function(active)
{
    if(active)
    {
        document.getElementById("Body").classList.add("loading");
        document.getElementById("Body").classList.remove("notLoading");
    }
    else
    {
        document.getElementById("Body").classList.remove("loading");
        document.getElementById("Body").classList.add("notLoading");
    }
}