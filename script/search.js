const searchItensByName = async function()
{
    const text = document.getElementById("SerachText").value;
    console.log(text)

    const sItens = await find(text);
    loadTable(sItens);
}

const loadTable = function(itens)
{
    console.log(itens)
    const init = "<tr><td><table><tr><td class=\"sBarcode\"><p class=\"minimal\">"
    const interval = "</p></td><td class=\"colSearch "
    const postInterval = "\"><p class=\"minimal\">"
    const end = "</p></td></tr></table></td></tr>"

    let buffer = "<table class=\"tblSearch\"><tr><td><table><tr><td class=\"sBarcode\"><p >Código</p></td><td class=\"colSearch sDescription\"><p>Descrição</p></td><td class=\"colSearch sQuant\"><p>Estoque</p></td><td class=\"colSearch sPrice\"><p>Preço</p></td></tr></table></td></tr>"

    let barcode, description, quant, price;
    quant = 0;
    price = 0;
    itens.forEach(e => {
        
        barcode = e.barcode;
        description = e.description;
        quant = e.quant;
        price = (e.sellprice /100).toFixed(2)


        let rowHtml = init + barcode + interval + "sDescription" + postInterval + description;
        rowHtml += interval + "sQuant" + postInterval + quant + "un" + interval
        rowHtml += "sPrice" + postInterval + "R$" + price + end;

        buffer += rowHtml;
        console.log(rowHtml)
    });

    buffer += "</table>"

    document.getElementById("TblSearch").innerHTML = buffer;
}

const openSearch = function()
{
    awakePopup("PopupSearch");
    showSearch = true;

    document.getElementById("SerachText").focus();
}

const closeSearch = function()
{
    document.getElementById("SerachText").value = "";
    showSearch = false;
    killPopup("PopupSearch")

    const bc = document.getElementById("Barcode");

    if(bc.value.includes("/"))
    {
        bc.value = "";
    }

    document.getElementById("Barcode").focus();
}