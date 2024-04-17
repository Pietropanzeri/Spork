let clickedItems = [];

document.addEventListener('DOMContentLoaded', function () {

    const numberOfShapes = 50;
    clickedItems = [];

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

async function seatchRecepie(){
    const apiKey = "f77040e5ae60439a8ff055b2298ab447";
    let apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=`;

    clickedItems.forEach(element => {
        apiUrl= apiUrl + element.name + ",+";
    });

    apiUrl = apiUrl.slice(0, -2);
    apiUrl= apiUrl + `&apiKey=${apiKey}`;
    //let apiUrl = "TestJson/RecepieIng.json";
    console.log(apiUrl);
    const loader = document.getElementById('loader');
    const ItemsContainer = document.getElementById('itemsContainer');
    const messageContainer = document.getElementById('messageContainer');
  
    loader.style.display = 'block';
    messageContainer.style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        loader.style.display = 'none';
        if (data && data.length > 0) {
            displayRecepie(data);
        } else {
            ItemsContainer.innerHTML = '';    
            messageContainer.textContent = 'Nessun risultato disponibile.';
            messageContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Errore nella richiesta API:', error);
        ItemsContainer.innerHTML = '';    
        loader.style.display = 'none';
        messageContainer.textContent = 'Si è verificato un errore durante la ricerca.';
        messageContainer.style.display = 'block';
    }



}

async function searchIngredients() {
    const apiKey = "f77040e5ae60439a8ff055b2298ab447";
    const searchParam = document.getElementById('searchParam').value;
    const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${searchParam}&apiKey=${apiKey}`;
    //const apiUrl = "TestJson/Ingredients.json";
  
    const loader = document.getElementById('loader');
    const ItemsContainer = document.getElementById('itemsContainer');
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
            ItemsContainer.innerHTML = '';    
            messageContainer.textContent = 'Nessun risultato disponibile.';
            messageContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Errore nella richiesta API:', error);
        ItemsContainer.innerHTML = '';    
        loader.style.display = 'none';
        messageContainer.textContent = 'Si è verificato un errore durante la ricerca.';
        messageContainer.style.display = 'block';
    }
  }
  
  function displayItems(Items) {
    const ItemsSelectedContainer = document.getElementById('selectedItemsList');
    const ItemsContainer = document.getElementById('itemsContainer');
    const messageContainer = document.getElementById('messageContainer');
  
    messageContainer.style.display = 'none';
  
    ItemsContainer.innerHTML = '';    
    Items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('ingredient-card');
  
         const itemImage = document.createElement('img');
         itemImage.src = "https://spoonacular.com/cdn/ingredients_250x250/" + item.image;
         itemImage.alt = item.name;
  
           const itemTitle = document.createElement('h5');
          itemTitle.textContent = item.name;
      
          itemCard.addEventListener('click', function () {
            updateClickedItemsList(item);
        });

        itemCard.appendChild(itemImage);
        itemCard.appendChild(itemTitle);
        ItemsContainer.appendChild(itemCard);
    });
  }

  function updateClickedItemsList(item) {
    const ItemsContainer = document.getElementById('selectedItemsList');

    const exist = clickedItems.includes(item);

    if (!exist) {
        clickedItems.push(item);
        const itemCard = document.createElement('div');
        itemCard.classList.add('ingredient-card');

        const itemImage = document.createElement('img');
        itemImage.src = "https://spoonacular.com/cdn/ingredients_250x250/" + item.image;
        itemImage.alt = item.name;

        const itemTitle = document.createElement('h5');
        itemTitle.textContent = item.name;

        itemCard.addEventListener('click', function () {
            updateClickedItemsList(item);
        });

        itemCard.appendChild(itemImage);
        itemCard.appendChild(itemTitle);
        ItemsContainer.appendChild(itemCard);
    } 
    else {
        const existingItemIndex = clickedItems.findIndex(clickedItem => clickedItem.name === item.name);
        clickedItems.splice(existingItemIndex, 1);

        const itemCards = ItemsContainer.getElementsByClassName('ingredient-card');
        
        for (let i = 0; i < itemCards.length; i++) {
            const cardTitle = itemCards[i].querySelector('h5');
            
            if (cardTitle.textContent === item.name) {
                itemCards[i].remove();
                break;
            }
        }

        
    }
}
  
function displayRecepie(recipes) {
    const recipeContainer = document.getElementById('itemsContainer');
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
  