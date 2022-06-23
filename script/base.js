let baseUrl = window.location.href;

//baseUrl = "http://localhost:5000/";



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toPdv').innerHTML = "<a href=\"PDV\">Abrir PDV</a>"
})

function logout()
{
    localStorage.setItem('jwt', null);
    window.location.href = "/"
}