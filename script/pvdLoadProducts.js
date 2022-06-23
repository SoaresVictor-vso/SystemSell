const loadProduct = function()
{
    const enter = readBarcode();
    if(enter != "")
    {
        const sstr = getQuantCod(enter);
        const quant = sstr[0];
        const cod = sstr[1];

        getProduct(cod).then((r) => {setProduct(r, cod, quant)}); 
    }
}

const setProduct = function(data, cod, quant)
{
    if(data.erro)
    {
        console.warn( "Alert == " + data.erro)
        if(data.erro == "permissionDenied")
        {
            permissionDeniedException();
        }
        else
        {
            nocadException(cod, quant);
        }
    }
    else
    {   
        let val = data.price / 100;
        let desc = data.description;
        let sub = parseFloat(val) * parseFloat(quant);
        soma += sub;

        let item = new prod(cod, desc, parseFloat(val).toFixed(2), parseFloat(quant).toFixed(2))
        write(item, soma);
        
        historico.push(item);
        loadHist();
    }
}

const readBarcode = function()
{
    //Le o codigo de barras e retorna uma string sem espaços
    typed = document.getElementById("Barcode").value;
    document.getElementById("Barcode").value = "";

    while(typed.includes(" "))
    {
        typed = typed.replace(" ",'');
    }
    return typed;
}

const getQuantCod = function(enter)
{
    //faz o parse de '[quant]*[codigo]' para data=[quant, codigo]
    if(enter.includes('*'))
    {
        data = enter.split("*");
        if(data[0] == "")
        {
            data[0] = 1;
        }
    }
    else
    {
        data = [1, enter];
    }
    return data;
}

const nocadException = function(cod, quant)
{
    //ativa a popup de alerta e adiciona um produto ao historico
    const name = "Produto sem Cadastro";
    nocadAlert = true;
    nocadPopup = true;
    let nocadItem = new prod(cod, name, 0.00, quant)
    historico.push(nocadItem);
    
    awakePopup("PopupNoCad");
    write(nocadItem, soma)
    loadHist();
}

const permissionDeniedException = function(cod, quant)
{
    noPermission = true;
    awakePopup("PopupPermissionDenied");
}