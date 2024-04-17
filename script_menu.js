document.addEventListener('DOMContentLoaded', function () {
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

async function searchMenuItems() {
  const apiKey = "f77040e5ae60439a8ff055b2298ab447";
  var number = document.querySelector('#numberOfItems').value;
  const searchParam = document.getElementById('searchParam').value;
  const apiUrl = `https://api.spoonacular.com/food/menuItems/search?query=${searchParam}&number=${number}&apiKey=${apiKey}`;
  //const apiUrl = "TestJson/MenuItem.json";

  const loader = document.getElementById('loader');
  const ItemsContainer = document.getElementById('itemsContainer');
  const messageContainer = document.getElementById('messageContainer');

  loader.style.display = 'block';
  messageContainer.style.display = 'none';

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      loader.style.display = 'none';

      if (data.menuItems && data.menuItems.length > 0) {
          displayItems(data.menuItems);
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
  const ItemsContainer = document.getElementById('itemsContainer');
  const messageContainer = document.getElementById('messageContainer');

  messageContainer.style.display = 'none';

  ItemsContainer.innerHTML = '';    
  Items.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.classList.add('recipe-card');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.title;

    const itemTitle = document.createElement('h5');
    itemTitle.textContent = item.title;

    const ItemChain = document.createElement('h2');
    ItemChain.textContent = item.restaurantChain;
    
    itemCard.appendChild(ItemChain);
    itemCard.appendChild(itemImage);
    itemCard.appendChild(itemTitle);
    ItemsContainer.appendChild(itemCard);
  });
}