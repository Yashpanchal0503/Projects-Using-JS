const joke = document.getElementById("joke");

let url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';

async function getJoke() {
    let response = await fetch(url);
    let data = await response.json();
    const fullText = data.joke;

    joke.classList.add('typing'); // add cursor
    joke.innerHTML = '';
    
    let index = 0;
    function typeLetter() {
        if (index < fullText.length) {
            joke.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(typeLetter, 35);
        } else {
            joke.classList.remove('typing'); // remove cursor
        }
    }

    typeLetter();
}

window.onload = getJoke;

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}