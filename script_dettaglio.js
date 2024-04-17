document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    loadRecipeDetails(recipeId);

    const numberOfShapes = 50;
  
    for (let i = 0; i < numberOfShapes; i++) {
      createShape();
    }
  
    function createShape() {
      const shape = document.createElement("div");
      shape.classList.add("shape");
      shape.style.width = Math.random() * 50 + "px";
      shape.style.height = shape.style.width;
      shape.style.top = Math.random() * 200 + "vh";
      shape.style.left = Math.random() * 100 + "vw";
  
      document.querySelector(".background-shapes").appendChild(shape);
    }
});

async function loadRecipeDetails(recipeId) {
    try {
        const apiKey = 'e60868fef15a48efae8c2f82916fe18a';
        let apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        //let apiUrl = `TestJson/test.json`;

        const response = await fetch(apiUrl);
        const recipeDetails = await response.json();
        
        displayRecipeDetails(recipeDetails);
    } catch (error) {
        console.error('Errore nel recupero dei dettagli della ricetta:', error);
    }
}

function displayRecipeDetails(recipeDetails) {
    const recipeDetailsContainer = document.getElementById('recipeDetails');

    const html = `
    <div class="d-flex flex-wrap">
        <div class="col-12 col-md-6">
            <img src="${recipeDetails.image}" alt="${recipeDetails.title}" class="img-fluid mb-4 rounded-5 description-card">
        </div>
        <div class="col-12 col-md-6 description-card">
            <h2 class="mb-4 Titleshadow">${recipeDetails.title}</h2>
            <p><strong>Servings:</strong> ${recipeDetails.servings}</p>
            <p><strong>Ready in Minutes:</strong> ${recipeDetails.readyInMinutes}</p>
            <p><strong>Health Score:</strong> ${recipeDetails.healthScore} / 100</p>
            <p><strong>Spoonacular Score:</strong> ${Math.round(recipeDetails.spoonacularScore)} / 100</p>
            <p>${recipeDetails.summary.split('Similar recipes ')[0]}</p>
        </div>
    </div>
    <br></br>
    <div class="d-flex align-items-center justify-content-center m-3">
        <h3 class="Titleshadow text-center m-3">Ingredients:</h3>
        <button id="toggleButton" class="btn rounded-5 Barshadow fontBold primaryColor" onclick="toggleList()">Hide List</button>
    </div>
    <div class="d-flex justify-content-center row">
        <div class="col-6">
        <ul class="list-unstyled" id="ingredientList">
            ${recipeDetails.extendedIngredients.map(ingredient => `<li class="ingredientItem rounded-5 m-3 secondaryColor Barshadow">${ingredient.original}</li>`).join('')}
        </ul>
    </div>
    
    </div>
    <br></br>
    <h3 class="mb-4 Titleshadow">Instructions:</h3>
    <p>${recipeDetails.instructions || 'No instructions available.'}</p>
    <br></br>
    <br></br>
    `;

    recipeDetailsContainer.innerHTML = html;
}
let isListOpen = true;

function toggleList() {
    const ingredientList = document.getElementById('ingredientList');

    if (isListOpen) {
        ingredientList.classList.add('collapsed');
    } else {
        ingredientList.classList.remove('collapsed');
    }

    isListOpen = !isListOpen;
}


document.addEventListener('DOMContentLoaded', function () {
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.classList.add('collapsed');
});
