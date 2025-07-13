const key='he1MI+QfYM+FebgzedpYLQ==QG3TPLSg2kFKPCk1';
const api_url= "https://api.api-ninjas.com/v1/quotes";
const quote =document.getElementById("quote");
const author =document.getElementById("author");

async function getquote(url) {
    const response = await fetch(url,{
        headers: {
            'Content-Type':'application/json',
            'X-Api-Key':key
        }
    });
    var data = await response.json();
    console.log(data[0]);
    
    quote.innerHTML=data[0].quote;
    author.innerHTML=data[0].author;
}

    
window.onload = getquote(api_url);