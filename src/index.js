let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

// my code below//
/////////////////
const toyDatabase = "http://localhost:3000/toys/"
const toyForm = document.getElementById("add-toy-form")

console.log(toyForm)
toyForm.addEventListener('submit', addNewToy);

function renderToyCards(toy){  

  const toyDiv = document.createElement("div");
  toyDiv.className = 'card'
  toyDiv.classList.add("toy-card");
  document.querySelector("#toy-collection").append(toyDiv);

  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  toyDiv.appendChild(h2);

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = 'toy-avatar';
  toyDiv.appendChild(img);

  const likes = document.createElement("p");
  likes.innerText = toy.likes;
  toyDiv.appendChild(likes);

  const btn = document.createElement("button");
  btn.innerText = "like"  
  btn.addEventListener('click', (e) => {

    toy.likes += 1;
    likes.innerText = toy.likes;
    updateLikes(toy)
        
  })
  
  toyDiv.appendChild(btn);
}

fetch(toyDatabase)
.then(resp => resp.json())
.then(data => {
  data.forEach(renderToyCards);
})

function addNewToy(event) {
  event.preventDefault();
  const newToyName = event.target.name.value;
  const newToyImg = event.target.image.value;
  
  fetch(toyDatabase, {
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      Accept:'application/json'},
      body: JSON.stringify({
        name: newToyName,
        image: newToyImg,
        likes: 0
      })})
      .then(resp => resp.json())
      .then(data =>{
        renderToyCards(data);
      })
    }
    
    function updateLikes(toy){

      fetch(toyDatabase + `${toy.id}`, {
        method: 'PATCH',
        headers: {"Content-Type":"application/json",
                  Accept:"application/json"},
        body: JSON.stringify(toy) 
      })
    }
    
  })
  
  
  
  
