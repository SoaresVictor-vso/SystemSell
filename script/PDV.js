let db;

let soma = 0.00;

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
    write();
});

/*console.log(dbJson)*/

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter')
    {
        write();
    }
  
  });

function write()
{
    let quant = 1;
    let cod;
    let enter;

    
    
    enter = document.getElementById("Barcode").value;
    document.getElementById("Barcode").value = "";

    while(enter.includes(" "))
    {
        enter = enter.replace(" ",'');
    }

    if(enter.includes('*'))
    {
        console.log("Mais de um?????");
        sstr = enter.split("*");
        quant = sstr[0];
        cod = sstr[1];
        console.log(sstr);
    }
    else
    {
        cod = enter;
    }

    let val;
    let desc = "";
    
    db.forEach(element => {
        if(element.Barcode == cod)
        {
            console.log(JSON.stringify(element.Desciption));
            val = JSON.stringify(element.Value);
            desc = JSON.stringify(element.Desciption);
            
        }
    });

    if(val == undefined)
    {
        console.log("sem cadastro");
    }
    else
    {   
        while(val.includes("\""))
        {
            val = val.replace("\"",'');
        }
        
        document.getElementById("ValUnit").innerHTML = "R$" + val;

        document.getElementById("Qtd").innerHTML = quant + "un";

        let sub = 0.03
        sub = parseFloat(val) * parseFloat(quant);
        document.getElementById("SubTotal").innerHTML = "R$" + sub.toFixed(2);
        
        soma += sub;//.toFixed(2);
        document.getElementById("Total").innerHTML = "R$" + soma.toFixed(2);

        desc = desc.substring(1, desc.length - 1);

        let freeSpace = 40 - desc.length;

        let finalDesc = "";

        for(let i = 0; i < freeSpace; i++)
        {
            finalDesc += " ";
        }

        finalDesc += desc;

        document.getElementById("Description").innerHTML = finalDesc;

        historico.push(new prod(cod, desc, parseFloat(val).toFixed(2), parseFloat(quant).toFixed(2)));
        console.log(historico);

        loadHist();
        

    }
    
    
}

function loadHist()
{
    switch (historico.length) {
        case 0:
            document.getElementById("P1").innerHTML = "";
            document.getElementById("P2").innerHTML = "";
            document.getElementById("P3").innerHTML = "";
            document.getElementById("P4").innerHTML = "";
            break;
        case 1:
            document.getElementById("P1").innerHTML = writeProductFromIndex(historico.length - 1);
            document.getElementById("P2").innerHTML = "";
            document.getElementById("P3").innerHTML = "";
            document.getElementById("P4").innerHTML = "";
            break;
        case 2:
            document.getElementById("P1").innerHTML = writeProductFromIndex(historico.length - 1);
            document.getElementById("P2").innerHTML = writeProductFromIndex(historico.length - 2);
            document.getElementById("P3").innerHTML = "";
            document.getElementById("P4").innerHTML = "";
            break;
        case 3:
            document.getElementById("P1").innerHTML = writeProductFromIndex(historico.length - 1);
            document.getElementById("P2").innerHTML = writeProductFromIndex(historico.length - 2);
            document.getElementById("P3").innerHTML = writeProductFromIndex(historico.length - 3);
            document.getElementById("P4").innerHTML = "";
            break;
    
        default:
            document.getElementById("P1").innerHTML = writeProductFromIndex(historico.length - 1);
            document.getElementById("P2").innerHTML = writeProductFromIndex(historico.length - 2);
            document.getElementById("P3").innerHTML = writeProductFromIndex(historico.length - 3);
            document.getElementById("P4").innerHTML = writeProductFromIndex(historico.length - 4);
            break;
    }
}

function writeProductFromIndex(index)
{
    console.log(index + "test")
    return "<br\><p class=\"minimal ralign\">"+historico[index].barcode+"</p\><p class=\"minimal ralign\">"+historico[index].description+"</p\><table\><tr\><td class=\"showQtd\"\><p class=\"minimal\">"+historico[index].quant+"un</p\></td\><td class=\"showVal\"\><p class=\"minimal\">R$"+historico[index].value+"</p\></td\><td class=\"showSubTt\"\><p class=\"minimal\">R$"+(historico[index].value*historico[index].quant).toFixed(2)+"</p\></td\></tr\></table\>";
    
 
}