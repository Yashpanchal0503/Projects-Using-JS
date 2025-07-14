let displayTime = document.getElementById("displayTime");

setInterval(() => {
  let curTime = new Date();
  let h = (curTime.getHours() < 10 ? "0" : "") + curTime.getHours();
  let m = (curTime.getMinutes() < 10 ? "0" : "") + curTime.getMinutes();
  let s = (curTime.getSeconds() < 10 ? "0" : "") + curTime.getSeconds();
  displayTime.textContent = `${h}:${m}:${s}`;
}, 1000);
