let db;
let soma = 0.00;

let nocadPopup = false;

function prod(barcode, description, value, quant) {
    this.barcode = barcode;
    this.description = description;
    this.value = value;
    this.quant = quant;
}

let historico = [
]

document.getElementById("P1").innerHTML = "";
document.getElementById("P2").innerHTML = "";
document.getElementById("P3").innerHTML = "";
document.getElementById("P4").innerHTML = "";


fetch('../FakeDb/Products.json').then(function(resp) {
    return resp.json();
})
.then(function(data) {
    db = data;
    console.log(data);
});

/*console.log(dbJson)*/

document.addEventListener('keyup', () => {
    if(nocadPopup)
    {
        killNocad();
    }
})

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        if(document.getElementById("Barcode").value != "")
        {
            write();
        }
    }
  
  });

document.addEventListener('click',() => {
    if(nocadPopup)
    {
        killNocad();
    }
})



function write()
{
    let enter;
    let quant;
    let cod;
    let val;
    let desc = "";
    let sub;
    let sstr;
    
    
    enter = readBarcode();

    sstr = getQuantCod(enter);
    quant = sstr[0];
    cod = sstr[1];

    db.forEach(element => {
        if(element.Barcode == cod)
        {
            val = JSON.stringify(element.Value);
            desc = JSON.stringify(element.Desciption);
        }
    });

    if(val == undefined)
    {
        nocadException(cod, quant);
    }
    else
    {   
        while(val.includes("\""))
        {
            val = val.replace("\"",'');
        }

        sub = parseFloat(val) * parseFloat(quant);
        soma += sub;
        desc = desc.substring(1, desc.length - 1);
        
        document.getElementById("ValUnit").innerHTML = "R$" + val;
        document.getElementById("Qtd").innerHTML = quant + "un";
        document.getElementById("SubTotal").innerHTML = "R$" + sub.toFixed(2);
        document.getElementById("Total").innerHTML = "R$" + soma.toFixed(2);
        document.getElementById("Description").innerHTML = desc;

        historico.push(new prod(cod, desc, parseFloat(val).toFixed(2), parseFloat(quant).toFixed(2)));
        loadHist();
    }
}

function getQuantCod(enter)
{
    if(enter.includes('*'))
    {
        data = enter.split("*");
    }
    else
    {
        data = [1, enter];
    }
    return data;
}

function nocadException(cod, quant)
{
    //ativa a popup de alerta e adiciona um produto ao historico
    let popup = document.getElementById("PopupSemCadastro");
    popup.classList.remove("popupInactive");
    popup.classList.add("popupActive");
    nocadPopup = true;

    historico.push(new prod(cod, "Produto sem Cadastro", 0.00, quant));
    loadHist();
}

function readBarcode()
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

function loadHist()
{
    //carrega o histórico de um array para o HTML utilizando 
    //a função "writeProductFromIndex"
    let i;
    console.log(historico.length)
    for(i = 1; i <= 4; i++)
    {
        if(i <= historico.length)
        {
            document.getElementById("P"+i).style.width = "30vw"
            document.getElementById("P"+i).innerHTML = writeProductFromIndex(historico.length - (i), i);
        }
        else
        {
            document.getElementById("P"+i).style.width = 0;
        }
    }
}

function writeProductFromIndex(index, box)
{
    //escreve o html de cada peça do histórico e deixa vermelho
    //caso o produto nao tenha cadastro
    if(historico[index].description == "Produto sem Cadastro")
    {
        document.getElementById("P"+box).classList.add("alerta");
    }
    else
    {
        document.getElementById("P"+box).classList.remove("alerta");
    }
    return "<br\><p class=\"minimal ralign\">"+historico[index].barcode+"</p\><p class=\"minimal ralign\">"+historico[index].description+"</p\><table\><tr\><td class=\"showQtd\"\><p class=\"minimal\">"+historico[index].quant+"un</p\></td\><td class=\"showVal\"\><p class=\"minimal\">R$"+historico[index].value+"</p\></td\><td class=\"showSubTt\"\><p class=\"minimal\">R$"+(historico[index].value*historico[index].quant).toFixed(2)+"</p\></td\></tr\></table\>";
}

function killNocad()
{
    //Torna invisivel a popup de alerta de cadastro nao existente
    let popup = document.getElementById("PopupSemCadastro");
    popup.classList.remove("popupActive");
    popup.classList.add("popupInactive");
    nocadPopup = false;
}