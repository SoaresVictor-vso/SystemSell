let soma = 0.00;            //valor dos produtos já passados

//Popups Ativas
let nocadPopup = false;
let nocadFinal = false;
let finalizePopup = false;
let showlist = false;
let noPermission = false;
let showSearch = false;

//Algum produto sem cadastro passado?
let nocadAlert = false;

//Modelo de produto
function prod(barcode, description, value, quant) {
    this.barcode = barcode;
    this.description = description;
    this.value = value;
    this.quant = quant;
}

//Histórico de produtos passados
let historico = [];


//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////EVENT LISTENERS////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



document.addEventListener('DOMContentLoaded', () => {
    
    loadHist();
})

document.addEventListener('keyup', (e) => {
    onKeyUp(e);
});

document.addEventListener('keydown', (e) => {
    onKeyDown(e);
})

document.addEventListener('click',() => {
    onAnyclick();
})

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////MÉTODOS E FUNÇÕES////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

const onKeyUp = function(e)
{
    if (e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        if(!finalizePopup && !showSearch)
        {
            loadProduct();
        }
    }


    else if (e.code === "F4")
    {
        finalizeBuy();
    }


    else if (e.code === "F8")
    {
        openList();
    }

    else if (e.code === "IntlRo" || e.code === "NumpadDivide")
    {
        openSearch();
    }


    else if(e.code == 'Escape')
    {
        if(showlist)
        {
            closeList();
        }
        else if(finalizePopup)
        {
            cancellFinalize();
        }
        else if(showSearch)
        {
            closeSearch();
        }
    }
    
    else if (e.code === "Delete")
    {
        toMenu();
    }

    if(finalizePopup)
    {
        reloadFinalValue();
    }
}

const onKeyDown = function(e)
{
    if(nocadPopup)
    {
        killPopup("PopupNoCad");
        nocadPopup = false;
    }
    else if(noPermission)
    {
        killPopup("PopupPermissionDenied");
        noPermission = false;
    }
}

const onAnyclick = function()
{
    if(nocadPopup)
    {
        killPopup("PopupNoCad");
        nocadPopup = false;
    }
    else if(noPermission)
    {
        killPopup("PopupPermissionDenied");
        noPermission = false;
    }
    if(finalizePopup)
    {
        reloadFinalValue();
    }
}

const toMenu = function()
{
    window.location.href =" /index";
}

