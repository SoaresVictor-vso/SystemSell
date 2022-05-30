let baseUrl = window.location.href;

//baseUrl = "http://localhost:5000/";



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toPdv').innerHTML = "<a href=\"" + baseUrl + "PDV\">Abrir PDV</a>"
})