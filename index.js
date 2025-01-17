let currentPets = [];
function loadCategorybutton() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategoryButton(data.categories))
        .catch(error => console.error('Error fetching categories:', error));
}


function displayCategoryButton(categories) {
 
    const categoryButtonContainer = document.getElementById('category-ButtonContainer');
    categoryButtonContainer.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = "btn border px-5 py-4 flex items-center justify-center space-x-3";
        button.innerHTML = `
            <img src="${category.category_icon}" icon" class="h-6 w-6"> 
            <span>${category.category}</span>
        `;
        button.addEventListener('click', () => {
            const allButtons = categoryButtonContainer.querySelectorAll('button');
            allButtons.forEach(btn => btn.classList.remove('bg-[#BAD9DB]', 'text-white')); 

      
            button.classList.add('bg-[#BAD9DB]', );
          
            displayCategoryPets(category.category)
        });
        categoryButtonContainer.appendChild(button);
    });
}


function showCountdown(id){

}

function showLoader() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}




function hideLoader() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}


function 

displayCategoryPets(categoryName) {
    showLoader();
    const allCardContainers = document.getElementById('all-card-container');
    allCardContainers.innerHTML = '';  

    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                hideLoader();
                
                if (data.data && data.data.length > 0) {
                    displayAllCards(data.data);
                } else {
                    allCardContainers.innerHTML = `
                        <div class="flex justify-center items-center w-full">
                            <div class="card w-96 shadow-xl text-center">
                                <figure>
                                    <img src="./images/error.webp" alt="No Pets Found" class="w-full h-64 object-cover" />
                                </figure>
                                <div class="card-body">
                                    <h2 class="card-title">No Information Available</h2>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
                                    <div class="card-actions justify-end">
                                        <button class="btn btn-primary" onclick="retryFetchingCategory('${categoryName}')">Try Again</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            })
            .catch(error => {
                hideLoader();
                console.error('Error fetching category pets:', error);
            });
    }, 2000);
}


function retryFetchingCategory(categoryName) {
    displayCategoryPets(categoryName);
}



function displayAllCards(pets) {
    const allCardContainers = document.getElementById('all-card-container');
    allCardContainers.innerHTML = ''; 
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.className = "card border p-1.5";
        div.innerHTML = `
            <figure class="flex justify-center">
                <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-auto" />
            </figure>
            <div class="card-body text-start">
                <h1 class="font-bold text-lg mt-3">${pet.pet_name || "Not Available"}</h1>
                <div class="gap-4 mt-4 space-y-5">
                    <p class="flex items-center">
                        <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=000000">
                        <span class="font-bold">Breed:</span> ${pet.breed || "Not Available"}
                    </p>
                    <p class="flex items-center">
                        <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000">
                        <span class="font-bold">Birth:</span> ${pet.date_of_birth || "Not Available"}
                    </p>
                    <p class="flex items-center">
                        <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=WVVCQKOTlT87&format=png&color=000000">
                        <span class="font-bold">Gender:</span> ${pet.gender || "Not Available"}
                    </p>
                    <p class="flex items-center">
                        <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=85843&format=png&color=000000">
                        <span class="font-bold">Price:</span> ${pet.price || "Not Available"}
                    </p>
                </div>
            </div>
            <hr/>
            <div class="flex justify-between mt-5">
                <button onclick="addToCart('${pet.petId}')" class="btn"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"/></button>
                <button onclick="showCountdown('${pet.petId}')" class="btn">Adopt</button>
                <button onclick="showDetails('${pet.petId}')" class="btn">Details</button>
            </div>
        `;
        allCardContainers.appendChild(div);
    });
}


function priceShort(){

    let sortedPrice = [...currentPets]
   sortedPrice.sort((a,b)=> b.price - a.price)
   displayAllCards(sortedPrice)
}

let countdownValue = 3;

function showCountdown(petId) {
    const modalContainer = document.getElementById('modal-container');

    
    modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box text-center">
               <div class="flex items-center justify-center">
                <img src="https://img.icons8.com/?size=100&id=kRZicCB1E8B8&format=png&color=000000"/>
               </div>
                <h1 class="font-extrabold">Congrats</h1>
                <p class="py-4 font-bold">Adoption process is starting for your pet</p>
                <h3 class="font-bold text-4xl text-[#28888E]">
                    <span class="countdown font-mono">
                        <span style="--value:5;"></span>
                    </span>
                </h3>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;

    const modal = document.getElementById('my_modal_1');
    const countdownSpan = modal.querySelector('.countdown span');

    let countdownValue = 3; 
    countdownSpan.style.setProperty('--value', countdownValue);

    modal.showModal();

    const interval = setInterval(() => {
        countdownValue--;
        countdownSpan.style.setProperty('--value', countdownValue);

        if (countdownValue === 0) {
            clearInterval(interval); 
            modal.close(); 
        }
    }, 1000);

    modal.addEventListener('close', () => {
        clearInterval(interval); 
    });
}

async function showDetails(petId) {
   
    const modalContainer = document.getElementById('modal-container');
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
        const data = await res.json();
        console.log(data.petData)

        const { price, date_of_birth, vaccinated_status,
            breed, image, pet_name, gender, pet_details } = data.petData;

        modalContainer.innerHTML = `
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <div class="card border p-1.5">
                    <figure class="flex justify-center">
                        <img src="${image}" alt="${pet_name}" class="w-full h-auto" />
                    </figure>
                    <div class="card-body text-start">
                        <h1 class="font-bold text-lg mt-3">${pet_name}</h1>
                        <div class="gap-4 mt-4 space-y-5">
                            <p class="flex items-center">
                                <span class="font-bold">Breed:</span> ${breed || "Not Available"} 
                            </p>
                            <p class="flex items-center">
                                <span class="font-bold">Birth:</span> ${date_of_birth || "Not Available"}
                            </p>
                            <p class="flex items-center">
                                <span class="font-bold">Gender:</span> ${gender || "Not Available"}
                            </p>
                            <p class="flex items-center">
                                <span class="font-bold">Price:</span> ${price || "Not Available"}
                            </p>
                            <p class="flex items-center">
                                <span class="font-bold">vaccinated_status:</span> ${vaccinated_status || "Not Available"}
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <h1 class="font-extrabold">Details Information</h1>
                    <p>${pet_details}</p>
                </div>
                <div class="modal-action">
                    <button class="btn" onclick="document.getElementById('my_modal_5').close()">Close</button>
                </div>
            </div>
        </dialog>`;
        document.getElementById('my_modal_5').showModal();
    } catch (error) {
        console.error('Error fetching pet details:', error);
    }
}

 


async function addToCart(petId) {
    const FavCart = document.getElementById('fav-card');
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
        const data = await res.json();
        const { image } = data.petData;

        const imgElement = document.createElement('img');
        imgElement.src = image;
      
        imgElement.classList.add("w-full", "h-auto", "rounded");
        FavCart.appendChild(imgElement);
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
}


function loadAllCards() {
    showLoader();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            currentPets = data.pets
            hideLoader();
            displayAllCards(currentPets);
          
        })
        .catch(error => {
            hideLoader();
            console.error('Error fetching pets:', error);
        });
}


loadCategorybutton();
loadAllCards(); 
