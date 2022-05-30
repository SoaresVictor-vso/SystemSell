const reloadFinalValue = function()
{
    desconto = parseFloat(document.getElementById("DiscountValue").value).toFixed(2);
    final = (soma - desconto).toFixed(2);
    document.getElementById("ProductsSum").innerHTML = soma.toFixed(2);
    document.getElementById("FinalValue").innerHTML = final;
}

const pagamentoDinheiro = function()
{
    console.log("Pago em dinheiro");
    reset();
}

const reset = function()
{
    //Leva o PDV ao estado inicial
    const voidItem = new prod("", '...', 0.00, 0.00);
    soma = 0.00;
    finalizePopup = false;
    historico = [];

    write(voidItem, soma,);
    killPopup("PopupFinalizeBuy");
    loadHist();
    document.getElementById("DiscountValue").value = 0.00;
    nocadAlert = false;
}