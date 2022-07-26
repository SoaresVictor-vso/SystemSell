const margin = document.getElementById('Margin');
const sellPrice = document.getElementById('SellPrice');
const buyPrice = document.getElementById('BuyPrice');
const barcode = document.getElementById('Barcode');
const quant = document.getElementById('Quantity');
const description = document.getElementById('Description');

const all = document.getElementById("all");

let loadedBarcode;
let errorPopup = false;
let errorPermission = false;
let searchPopup = false;

const inputFields = ["Barcode", "Description", "Quantity", "BuyPrice", "Margin", "SellPrice", "Salvar"]

document.addEventListener('mouseup', (e) => {
    if(errorPopup)
    {
        errorPopup = false;
        killPopup("PopupError");
        document.getElementById("ErrorMsg").innerText = ""
        if(errorPermission)
        {
            window.location.href = "/login";
        }
    }
})

document.addEventListener('keyup', (e) => {
    if(errorPopup)
    {
        errorPopup = false;
        killPopup("PopupError");
        document.getElementById("ErrorMsg").innerText = ""
        if(errorPermission)
        {
            window.location.href = "/login";
        }
    }

    
    else if (e.code === "IntlRo" || e.code === "NumpadDivide")
    {
        openSearch();
    }

    else if (e.code === "Escape" && searchPopup)
    {
        closeSearch();
    }

    else if (e.code === "F8")
    {
        fullClear();
    }

    else if (e.code === "Delete")
    {
        toMenu();
    }
})

document.addEventListener('keydown', async (e) => {
    
    
    if(e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        if(document.activeElement.id == "Margin" || document.activeElement.id == 'BuyPrice')
        {
            syncSellPrice();
        }
        else if(document.activeElement.id == "Barcode")
        {
            loadedBarcode = String(barcode.value);

            all.style.cursor = "wait";

            await loadCad(String(barcode.value))

            all.style.cursor = "default";
        }


        //deve ser a ultima açao, pois o elemento ativo irá mudar após sua chamada
        moveSelection();
        
    }
    else if (e.code === "F4")
    {
        sendCad();
    }


});


const syncSellPrice = function()
{
    const buy = parseInt(parseFloat(buyPrice.value) * 100)
    const porcent = parseInt(parseFloat(margin.value) * 100)
    if(buy > 0 && porcent > 0)
    {
        const sell = ((buy * (100 * 100 + porcent))/(100 * 100 * 100)).toFixed(2);
        sellPrice.value = sell
    }
}

const moveSelection = function()
{
    const active = document.activeElement.id;
    let activeIndex = inputFields.indexOf(active);
    if(activeIndex > inputFields.length - 2)
    {
        activeIndex = -1
    }
    document.getElementById(inputFields[activeIndex + 1]).focus();
}

const loadCad = async function(barcode)
{
    const prod = await getFullProduct(barcode);

    if(prod.erro != null)
    {
        if(prod.erro != "nullProduct")
        {
            console.warn("ERRO NO SERVIDOR\n" + prod.erro);
            if(prod.erro == "permissionDenied")
            {
                showPopup("Permissão negada!\nTente logar novamente.");
            }
            errorPermission = true;
        }
        else
        {
            clear();
        }
    }
    else
    {
        loadedBarcode = prod.barcode
        description.value = prod.description;
        quant.value = parseInt(prod.quant);
        buyPrice.value = parseFloat(prod.coast / 100).toFixed(2);
        margin.value = parseInt(prod.margin);
        sellPrice.value = parseFloat(prod.price / 100).toFixed(2);
    }
}

const sendCad = async function()
{
    
    const bcod = barcode.value;
    const desc = description.value;
    const newDesc = (desc.replace(/[^a-z0-9 ]/gi, ''));
    if(bcod == null || bcod == "")
    {
        showPopup("Impossível Cadastrar Sem Código de Barras!");
    }
    else if(bcod != loadedBarcode)
    {
        showPopup("O Código Digitado anteriormente não corresponde ao atual!");
    }
    else if(desc !== newDesc)
    {
        description.value = newDesc;
        showPopup("A descrição continha caracteres não permitidos!");
    }
    else if(newDesc == null || newDesc == "")
    {
        showPopup("Impossível cadastrar sem descrição!");
    }
    else
    {
        const prod = {
            "barcode":bcod,
            "description":String(newDesc.toUpperCase()),
            "quant":parseInt(quant.value),
            "buyPrice":parseInt(buyPrice.value * 100),
            "margin":parseInt(margin.value),
            "sellPrice":parseInt(sellPrice.value * 100)
        }
        clear();
        barcode.value = "";
        ret = await alterProduct(prod);
        barcode.focus();
    }

    
}

const clear = function()
{
    description.value = "";
    quant.value = "";
    buyPrice.value = "";
    margin.value = "";
    sellPrice.value = "";
}

const fullClear = function()
{
    barcode.value = "";
    clear();
    barcode.focus();
}

const showPopup = function(msg)
{
    document.getElementById("ErrorMsg").innerText = msg;
    errorPopup = true;
    awakePopup("PopupError");
}

const toMenu = function()
{
    window.location.href =" /index";
}
