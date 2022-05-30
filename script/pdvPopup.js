//GERAL
const killPopup = function(popupName)
{
    //desativa uma popup
    let popup = document.getElementById(popupName.toString());
    popup.classList.remove("popupActive");
    popup.classList.add("popupInactive");
}

const awakePopup = function(popupName)
{
    //Ativa uma popup  
    let popup = document.getElementById(popupName.toString());
    popup.classList.add("popupActive");
    popup.classList.remove("popupInactive");
}

//------------------------------------------------
//FECHAR COMPRA
const finalizeBuy = function()
{
    let desconto;
    let final;
    if(nocadAlert)
    {
        awakePopup("PopupFinalNocad");
        nocadFinal = true;
    }
    else
    {
        forceFinalizeBuy();
    }
}

const forceFinalizeBuy = function()
{
    if(showlist)
    {
        closeList();
    }
    if(nocadFinal)
    {
        killPopup("PopupFinalNocad");
    }
    awakePopup("PopupFinalizeBuy");
    finalizePopup = true;
    reloadFinalValue();
}

const cancellFinalize = function()
{
    killPopup("PopupFinalizeBuy");
        finalizePopup = false;
        document.getElementById("DiscountValue").value = 0.00;
}

//-------------------------------------------------
//LISTA DE PRODUTOS
const closeList = function()
{
    showlist = false;
    killPopup("PopupProductList");
}

const openList = function()
{
    loadList();
    showlist = true;
    awakePopup("PopupProductList");
    if(nocadFinal)
    {
        killPopup("PopupFinalNocad");
    }
}

const loadList = function()
{
    let listTable = "<table>";
    for (let i = 0; i < historico.length; i++) 
    {
        if(historico[i].description == "Produto sem Cadastro")
        {
            listTable += "<tr><td class = \"listItem\"><div class = \"redText\">" + writeProductFromIndex(i, -1) + "</div></tr></td>";
        }
        else
        {
            listTable += "<tr><td class = \"listItem\">" + writeProductFromIndex(i, -1) + "</tr></td>";
        }
        
    }
    
    listTable += "</table>";
    document.getElementById("ListElements").innerHTML = listTable;
}