const write = function(item, soma)
{
    //Carrega os valores corretos na coluna de status
    
    document.getElementById("ValUnit").innerHTML = "R$" + item.value;
    document.getElementById("Qtd").innerHTML = item.quant + "un";
    document.getElementById("SubTotal").innerHTML = "R$" + (item.value * item.quant).toFixed(2);
    document.getElementById("Total").innerHTML = "R$" + soma.toFixed(2);
    document.getElementById("Description").innerHTML = item.description;
}

const loadHist = function()
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

const writeProductFromIndex = function(index, box)
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

const writeList = function()
{
    //escreve uma lista dos produtos ja passados, incluindo os sem cadastro
    let contentHtml = "<table>";
    for (let i = 0; i < historico.length; i++) 
    {
        if(historico[i].description == "Produto sem Cadastro")
        {
            contentHtml += "<tr><td class = \"listItem\"><div class = \"redText\">" + writeProductFromIndex(i, -1) + "</div></tr></td>";
        }
        else
        {
            contentHtml += "<tr><td class = \"listItem\">" + writeProductFromIndex(i, -1) + "</tr></td>";
        }
        
    }
    
    contentHtml += "</table>";
    document.getElementById("ListElements").innerHTML = contentHtml;
}