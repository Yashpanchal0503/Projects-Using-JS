let speech= new SpeechSynthesisUtterance();
let voices=[];
let voiceSelect =document.querySelector("select");
window.speechSynthesis.onvoiceschanged=()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];

    voices.forEach((voice,i)=>(
        voiceSelect.options[i]=new Option(voice.name,i)
    ));
};
voiceSelect.addEventListener("change",()=>{
    speech.voice=voices[voiceSelect.value];
});


document.querySelector("button").addEventListener("click",()=>{
    speech.text=document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});





  const text = "Converter";
  
  const speed = 300;      // typing speed
  const eraseSpeed = 150;  // erasing speed
  const delay = 2000;     // pause after typing before erasing
  let i = 0;
  let typing = true;
  const el = document.getElementById("typing");

  function typeLoop() {
    if (typing) {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeLoop, speed);
      } else {
        typing = false;
        setTimeout(typeLoop, delay);
      }
    } else {
      if (i > 0) {
        el.innerHTML = text.substring(0, i - 1);
        i--;
        setTimeout(typeLoop, eraseSpeed);
      } else {
        typing = true;
        setTimeout(typeLoop, speed);
      }
    }
  }

  window.onload = typeLoop;

