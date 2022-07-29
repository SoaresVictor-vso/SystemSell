let foundItens = [];

document.addEventListener('keyup',(e) => {
    if((e.code === 'Enter' || e.code === 'NumpadEnter') && (showSearch || searchPopup))
    {
        searchItensByName();
    }
})

const searchItensByName = async function()
{
    document.getElementById("PopupSearch").classList.add("loading");
    document.getElementById("PopupSearch").classList.remove("notLoading");
    document.getElementById("SerachText").classList.add("loading");
    document.getElementById("SerachText").classList.remove("notLoading");
    const text = document.getElementById("SerachText").value;

    const sItens = await find(text);
    foundItens = sItens;
    loadTable(sItens);
}

const loadTable = function(itens)
{
    let init;
    if(document.title == "PDV")
    {
        init = "<tr><td><div onclick=\"openItemPdv("
    }
    else if(document.title == "Cadastro")
    {
        init = "<tr><td><div onclick=\"openItemEditor("
    }
    const postInit = ")\"><table><tr><td class=\"sBarcode\"><p class=\"minimal\">"
    const interval = "</p></td><td class=\"colSearch "
    const postInterval = "\"><p class=\"minimal\">"
    const end = "</p></td></tr></table></div></td></tr>"

    let buffer = "<table class=\"tblSearch\"><tr><td><table><tr><td class=\"sBarcode\"><p >Código</p></td><td class=\"colSearch sDescription\"><p>Descrição</p></td><td class=\"colSearch sQuant\"><p>Estoque</p></td><td class=\"colSearch sPrice\"><p>Preço</p></td></tr></table></td></tr>"

    let barcode, description, quant, price;
    quant = 0;
    price = 0;
    let i = 0;
    itens.forEach(e => {
        
        barcode = e.barcode;
        description = e.description;
        quant = e.quant;
        price = (e.sellprice /100).toFixed(2)


        let rowHtml = init + i + postInit + barcode + interval + "sDescription" + postInterval + description;
        rowHtml += interval + "sQuant" + postInterval + quant + "un" + interval
        rowHtml += "sPrice" + postInterval + "R$" + price + end;

        buffer += rowHtml;

        i++;
    });

    buffer += "</table>"

    document.getElementById("TblSearch").innerHTML = buffer;
    document.getElementById("PopupSearch").classList.remove("loading");
    document.getElementById("PopupSearch").classList.add("notLoading");
    document.getElementById("SerachText").classList.remove("loading");
    document.getElementById("SerachText").classList.add("notLoading");
}

const openSearch = function()
{
    awakePopup("PopupSearch");
    showSearch = true;
    searchPopup = true;

    document.getElementById("SerachText").focus();
}

const closeSearch = function()
{
    document.getElementById("SerachText").value = "";
    showSearch = false;
    searchPopup = false;
    killPopup("PopupSearch")

    const bc = document.getElementById("Barcode");

    if(bc.value.includes("/"))
    {
        bc.value = "";
    }

    document.getElementById("Barcode").focus();
}

const openItemPdv = function(index)
{
    const item = foundItens[index]
    const prod = {
        barcode : String(item.barcode),
        description : item.description,
        quant : item.quant,
        price : item.sellprice,
    }

    quant = getQuantCod(readBarcode())[0];

    setProduct(prod, item.barcode, quant);

    closeSearch();
}

const openItemEditor = async function(index)
{
    document.getElementById("Barcode").value = foundItens[index].barcode;
    
    loadCad(foundItens[index].barcode);
    
    closeSearch();
}