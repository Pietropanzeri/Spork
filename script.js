document.addEventListener("DOMContentLoaded", function() {
    const numberOfShapes = 50;
  
    for (let i = 0; i < numberOfShapes; i++) {
      createShape();
    }
  
    function createShape() {
      const shape = document.createElement("div");
      shape.classList.add("shape");
      shape.style.width = Math.random() * 50 + "px";
      shape.style.height = shape.style.width;
      shape.style.top = Math.random() * 200 + "%";
      shape.style.left = Math.random() * 100 + "%";
  
      document.querySelector(".background-shapes").appendChild(shape);
    }
});

async function getRecipes() {
    // apiKey = '0064e3fc536d43e7a38b3bc2af517b8a';    //92
    const apiKey = 'e60868fef15a48efae8c2f82916fe18a';      //005
    var number = document.querySelector('#numberOfItems').value;
    var inputValue = document.querySelector('#searchInput').value;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${inputValue}&number=${number}`;
    //const apiUrl = "TestJson/hometst.json";
    
    const loader = document.getElementById('loader');
    const recipeContainer = document.getElementById('recipeContainer');
    const messageContainer = document.getElementById('messageContainer');

    loader.style.display = 'block';
    messageContainer.style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        loader.style.display = 'none';

        if (data.results && data.results.length > 0) {
            displayItems(data.results);
        } else {
            recipeContainer.innerHTML = '';    
            messageContainer.textContent = 'Nessun risultato disponibile.';
            messageContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Errore nella richiesta API:', error);
        recipeContainer.innerHTML = '';    
        loader.style.display = 'none';
        messageContainer.textContent = 'Si è verificato un errore durante la ricerca.';
        messageContainer.style.display = 'block';
    }
  }

  function displayItems(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    const messageContainer = document.getElementById('messageContainer');

    messageContainer.style.display = 'none';

    recipeContainer.innerHTML = '';    
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      const recipeImage = document.createElement('img');
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.title;

      recipeCard.addEventListener('click', function() {
        window.location.href = 'dettaglioRicetta.html?id=' + recipe.id;
      });

      const recipeTitle = document.createElement('h5');
      recipeTitle.textContent = recipe.title;
      

      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeTitle);
      recipeContainer.appendChild(recipeCard);
    });
  }
  
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
        getRecipes();
    }
}

  const searchButton = document.getElementById('getRecepieButton');

  searchButton.addEventListener('click', getRecipes());
  
  