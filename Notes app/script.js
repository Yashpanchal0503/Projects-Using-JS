const notesContainer =document.querySelector(".notes-container");
const btn =document.querySelector(".btn");
let notes =document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML=localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}

btn.addEventListener("click",()=>{
    let inputBox=document.createElement("p");
    let img=document.createElement("img");
    inputBox.className="input-box";
    inputBox.contentEditable="true";
    img.src="assets/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);;
});
notesContainer.addEventListener("click", (e)=>{
    if(e.target.tagName==="IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName==="P"){
        notes=document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup=function(){
                updateStorage();
            }   
        });
    }
});

document.addEventListener("keydown", evt=>{
    if(evt.key==="Enter"){
        document.execCommand("insertLineBreak");
        evt.preventDefault();
    }
})

