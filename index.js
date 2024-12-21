function loadCategorybutton(){
fetch('https://openapi.programming-hero.com/api/peddy/categories')
.then(res=>res.json())
.then(data=>displayCategoryButton(data.categories
))
.catch(error => console.error('Error fetching pets:', error));
}

function displayCategoryButton(data){
    let categoryButtonContainer = document.getElementById('category-ButtonContainer')
    for( let categorys of data){
        let button = document.createElement('button')
        button.innerHTML = `
            <button class="btn border px-5 py-4 flex items-center justify-center space-x-3">
                <img src="${categorys.category_icon}" alt="${categorys.category} icon" class="h-6 w-6"> 
                <span>${categorys.category}</span>
            </button>
        `;
        
        categoryButtonContainer.append(button)
    }

}

function loadAllCards(){
   
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res=>res.json())
    .then(data=>diplayAllCards(data.pets
    ))
    .catch(error => console.error('Error fetching pets:', error));
}

function diplayAllCards(pets){
    let allCardContainers = document.getElementById('all-card-container')
    for(let pet of pets){
        let div = document.createElement('div');
        div.innerHTML = `
  <div class="card border p-1.5">
  <figure class="flex justify-center">
    <img
      src="${pet.image}"
      alt="${pet.pet_name}" 
      class="w-full h-auto" />
  </figure>
  <div class="card-body text-start">
    <h1 class="font-bold text-lg mt-3">${pet.pet_name}</h1>
   
     <div class=" gap-4 mt-4 space-y-5">
      <p class="flex items-center">
       <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=000000">
      <span class="font-bold">Breed:</span> ${pet.breed}</p>
      <p class="flex items-center">
      <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000">
      <span class="font-bold">Birth:</span> ${pet.date_of_birth}</p>
      <p class="flex items-center">
      <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=WVVCQKOTlT87&format=png&color=000000">
      <span class="font-bold">Gender:</span> ${pet.gender}</p>
      <p class="flex items-center">
       <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=85843&format=png&color=000000">
      <span class="font-bold">Price:</span> ${pet.price}</p>
    </div>
    
  </div>
  <span><hr/></span>
  <div class="flex justify-between mt-5">
  <button class="btn"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"/></button>
  <button class="btn">Adopt</button>
  <button class="btn">Details</button>
  </div>
</div>

        `
        allCardContainers.append(div)
    }
}

loadCategorybutton()
loadAllCards()