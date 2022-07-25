let baseUrl = window.location.href;

document.addEventListener('DOMContentLoaded', () => {
})

function logout()
{
    localStorage.setItem('jwt', null);
    window.location.href = "/"
}

function openPdv()
{
    window.location.href = "/PDV";
}

function openCad()
{
    window.location.href = "/cadastro";
}