let db;
fetch('../FakeDb/Products.json').then(function(resp) {
    return resp.json();
})
.then(function(data) {
    db = data;
    console.log(data);
    write("003");
});

/*console.log(dbJson)*/


/*function search(code)
{
    
    db.forEach(element => {
        if(element.Barcode == code)
        {
            console.log("Ok, Ok!");
            console.log(JSON.stringify(element.Desciption));
            let ret = JSON.stringify(element.Desciption) + "," + JSON.stringify(element.Value);
            
        }
    });
}*/

function write(cod)
{
    let val;
    let desc;
    let quant = 5;
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