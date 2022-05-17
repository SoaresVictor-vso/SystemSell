let db;
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
    console.log("Patooo")
    cod = document.getElementById("barcode").value;

    let val;
    let desc;
    let quant = 1;
    db.forEach(element => {
        if(element.Barcode == cod)
        {
            console.log("Ok, Ok!");
            console.log(JSON.stringify(element.Desciption));
            val = JSON.stringify(element.Value);
            desc = JSON.stringify(element.Desciption);
            
        }
    });
    
    val = val.replace(/\"/, '')
    val = val.replace(/\"/, '')
    document.getElementById("ValUnit").innerHTML = "R$" + val;

    document.getElementById("Qtd").innerHTML = quant + "un";

    let sub = 0.03
    sub = parseFloat(val) * parseFloat(quant);
    document.getElementById("SubTotal").innerHTML = "R$" + sub;

    document.getElementById("Total").innerHTML = "R$" + sub;

    desc = desc.replace(/\"/, '')
    desc = desc.replace(/\"/, '')

    let freeSpace = 40 - desc.length;
    console.log(freeSpace)

    let finalDesc = "";

    for(let i = 0; i < freeSpace; i++)
    {
        finalDesc += " ";
    }

    finalDesc += desc;

    document.getElementById("Description").innerHTML = finalDesc;
}