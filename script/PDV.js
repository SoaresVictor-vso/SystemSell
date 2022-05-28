

let db;
let soma = 0.00;

let nocadPopup = false;
let nocadFinal = false;
let lock = false;
let nocadAlert = false;
let showlist = false;

function prod(barcode, description, value, quant) {
    this.barcode = barcode;
    this.description = description;
    this.value = value;
    this.quant = quant;
}

let historico = [
]

loadHist();


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("CancelCloseBuy").addEventListener("mousedown", () =>{
        killPopup("PopupFinalizeBuy");
        lock = false;
        document.getElementById("DiscountValue").value = 0.00;
    })
    document.getElementById("PgtoDin").addEventListener('mousedown', () => {
        pagamentoDinheiro();
    })
    document.getElementById("funcF4").addEventListener("mousedown", () => {
        fecharCompra();
    })
    
})



document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        if(document.getElementById("Barcode").value != "" && !lock)
        {
            loadProduct();
        }
    }
    else if (e.code === "F4")
    {
        fecharCompra();
    }
    else if (e.code === "F8")
    {
        abrirLista();
    }
    else if(e.code == 'Escape')
    {
        if(showlist)
        {
            fecharLista();
        }
        killPopup("PopupFinalizeBuy");
        lock = false;
        document.getElementById("DiscountValue").value = 0;
    }
    
    if(lock)
    {
        atualizarValorFinal();
    }
  
  });

  document.addEventListener('keydown', () => {
    if(nocadPopup)
    {
        console.log("tecla")
        killPopup("NoCadPopup");
        nocadPopup = false;
    }
  })

document.addEventListener('click',() => {
    if(nocadPopup)
    {
        
    console.log("pop it up")
        killPopup("NoCadPopup");
        nocadPopup = false;
    }
    if(lock)
    {
        atualizarValorFinal();
    }
})



function setProduct(data, cod, quant)
{
    
    if(data.erro)
    {
        console.log( "erro == " + data.erro)
        nocadException(cod, quant);
    }
    else
    {   
        
        
        let val = data.Value;
        let desc = data.Description;

        /*while(val.includes("\""))
        {
            val = val.replace("\"",'');
        }*/

        let sub = parseFloat(val) * parseFloat(quant);
        soma += sub;
        write(val, quant, sub, soma, desc);
        

        historico.push(new prod(cod, desc, parseFloat(val).toFixed(2), parseFloat(quant).toFixed(2)));
        loadHist();
    }
}

function loadProduct()
{
    const enter = readBarcode();
    const sstr = getQuantCod(enter);
    const quant = sstr[0];
    const cod = sstr[1];

    getProduct(cod).then((r) => {
        setProduct(r, cod, quant)
    }); 
}

function loadList()
{
    let contentHtml = "<table>";
    for (let i = 0; i < historico.length; i++) 
    {
        if(historico[i].description == "Produto sem Cadastro")
        {
            contentHtml += "<tr><td class = \"elementoLista\"><div class = \"redText\">" + writeProductFromIndex(i, -1) + "</div></tr></td>";
        }
        else
        {
            contentHtml += "<tr><td class = \"elementoLista\">" + writeProductFromIndex(i, -1) + "</tr></td>";
        }
        
    }
    
    contentHtml += "</table>";
    document.getElementById("ListaExibida").innerHTML = contentHtml;
}

function abrirLista()
{
    loadList();
    showlist = true;
    awakePopup("PopupLista");
    if(nocadFinal)
    {
        killPopup("PopupFinalNocad");
    }
}

function fecharLista()
{
    showlist = false;
    killPopup("PopupLista");
}

function pagamentoDinheiro()
{
    killPopup("PopupFinalizeBuy");
    lock = false;
    historico = [];
    loadHist();
    soma = 0.00;
    write(0.00,0.00,0.00,soma, "...");
    document.getElementById("DiscountValue").value = 0.00;
    nocadAlert = false;
}

function fecharCompra()
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
        forceFecharCompra();
    }
}

function forceFecharCompra()
{
    if(showlist)
    {
        fecharLista();
    }
    if(nocadFinal)
    {
        killPopup("PopupFinalNocad");
    }
    awakePopup("PopupFinalizeBuy");
    lock = true;
    atualizarValorFinal();
}

function atualizarValorFinal()
{
    desconto = parseFloat(document.getElementById("DiscountValue").value).toFixed(2);
    final = (soma - desconto).toFixed(2);
    document.getElementById("ProductsSum").innerHTML = soma.toFixed(2);
    document.getElementById("FinalValue").innerHTML = final;
}

function write(val, quant, sub, soma, desc)
{
    document.getElementById("ValUnit").innerHTML = "R$" + val;
    document.getElementById("Qtd").innerHTML = quant + "un";
    document.getElementById("SubTotal").innerHTML = "R$" + sub.toFixed(2);
    document.getElementById("Total").innerHTML = "R$" + soma.toFixed(2);
    document.getElementById("Description").innerHTML = desc;
}

function getQuantCod(enter)
{
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

function nocadException(cod, quant)
{
    //ativa a popup de alerta e adiciona um produto ao historico
    const name = "Produto sem Cadastro";
    nocadAlert = true;
    nocadPopup = true;
    historico.push(new prod(cod, name, 0.00, quant));
    
    awakePopup("NoCadPopup");
    write(0.00, quant, 0.00, soma, name)
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
            document.getElementById("P"+i).innerHTML = "";
        }
    }
}

function writeProductFromIndex(index, box)
{
    //escreve o html de cada peça do histórico e deixa vermelho
    //caso o produto nao tenha cadastro
    if(box != -1)
    {
        if(historico[index].description == "Produto sem Cadastro")
        {
            document.getElementById("P"+box).classList.add("redText");
        }
        else
        {
            document.getElementById("P"+box).classList.remove("redText");
        }
    }
    return "<br><p class=\"minimal inline\">"+(index + 1).toString()+"</p><p class=\"minimal ralign rfloat inline\">"+historico[index].barcode+"</p\><p></p><p class=\"minimal ralign \">"+historico[index].description+"</p\><table\><tr\><td class=\"showQtd\"\><p class=\"minimal\">"+historico[index].quant+"un</p\></td\><td class=\"showVal\"\><p class=\"minimal\">R$"+historico[index].value+"</p\></td\><td class=\"showSubTt\"\><p class=\"minimal\">R$"+(historico[index].value*historico[index].quant).toFixed(2)+"</p\></td\></tr\></table\>";
}

function killPopup(popupName)
{
    //desativa uma popup
    let popup = document.getElementById(popupName.toString());
    popup.classList.remove("popupActive");
    popup.classList.add("popupInactive");
}

function awakePopup(popupName)
{
    //Ativa uma popup
    
    let popup = document.getElementById(popupName.toString());
    popup.classList.add("popupActive");
    popup.classList.remove("popupInactive");
}