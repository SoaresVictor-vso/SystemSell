const backUrl = "http://localhost:5000/"

getData("001");

function getData(cod)
{
    fetch(backUrl + "req/?cod=" + cod).then((data) => data.json()).then((data) => console.log(data));
}