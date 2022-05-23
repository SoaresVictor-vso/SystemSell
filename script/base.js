let baseUrl = "";

baseUrl = "http://localhost:5000/";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toPdv').innerHTML = "<a href=\"" + baseUrl + "PDV.html\">Abrir PDV</a>"
})