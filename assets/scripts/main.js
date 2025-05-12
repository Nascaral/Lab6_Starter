// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Retrieve 'recipes' from localStorage and parse it, or return an empty array if not found
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  const main = document.querySelector('main');

  // A11. Loop through recipes, create <recipe-card>, set data, and append to <main>
  recipes.forEach(recipe => {
    const card = document.createElement('recipe-card');
    card.data = recipe;
    main.appendChild(card);
  });
}


/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	 localStorage.setItem('recipes', JSON.stringify(recipes));
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. Get a reference to the <form> element
  const form = document.querySelector('form');

  // B3. Add a submit event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // B4. Create a new FormData object from the form
    const formData = new FormData(form);

    // B5. Create a recipeObject from formData
    const recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }

    // B6. Create a new <recipe-card> element
    const recipeCard = document.createElement('recipe-card');

    // B7. Assign the data to the new card
    recipeCard.data = recipeObject;

    // B8. Append the card to <main>
    document.querySelector('main').appendChild(recipeCard);

    // B9. Get existing recipes, add new one, and save back to localStorage
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);

    form.reset(); // Optional: clear form after submit
  });

  // B10. Get reference to the "Clear Local Storage" button
  const clearButton = document.getElementById('clear-storage');

  // B11. Add click event listener
  clearButton.addEventListener('click', () => {
    // B12. Clear localStorage
    localStorage.clear();

    // B13. Remove all child nodes from <main>
    document.querySelector('main').innerHTML = '';
  });
}