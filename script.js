const recipes = [
  // Breakfast
  {
    name: "Pancakes",
    category: "Breakfast",
    ingredients: ["flour", "milk", "egg"],
    rating: 4,
    image: "https://c4.wallpaperflare.com/wallpaper/839/432/3/food-berries-pancakes-breakfast-wallpaper-preview.jpg"
  },
  {
    name: "Omelette",
    category: "Breakfast",
    ingredients: ["eggs", "onion", "tomato"],
    rating: 5,
    image: "https://t3.ftcdn.net/jpg/07/15/86/22/360_F_715862236_VHJPf0EQsXpxSaoMJKOlkqfDSWlkMTZW.jpg"
  },
  {
    name: "Smoothie Bowl",
    category: "Breakfast",
    ingredients: ["banana", "berries", "yogurt"],
    rating: 5,
    image: "https://www.crowdedkitchen.com/wp-content/uploads/2020/07/strawberries-and-cream-smoothie-bowl.jpg"
  },

  // Lunch
  {
    name: "Veg Biryani",
    category: "Lunch",
    ingredients: ["rice", "vegetables", "spices"],
    rating: 5,
    image: "https://t3.ftcdn.net/jpg/09/82/71/66/360_F_982716634_04UFwbDpbgF083Yoc7B0PrXPlQLMDjJW.jpg"
  },
  {
    name: "Grilled Sandwich",
    category: "Lunch",
    ingredients: ["bread", "cheese", "vegetables"],
    rating: 4,
    image: "https://static.vecteezy.com/system/resources/thumbnails/040/707/928/small/ai-generated-grilled-meat-sandwich-on-toasted-ciabatta-with-fresh-salad-generated-by-ai-photo.jpg"
  },
  {
    name: "Paneer Butter Masala",
    category: "Lunch",
    ingredients: ["paneer", "butter", "tomato"],
    rating: 5,
    image: "https://vegecravings.com/wp-content/uploads/2017/04/paneer-butter-masala-recipe-step-by-step-instructions.jpg"
  },

  // Dinner
  {
    name: "Pizza",
    category: "Dinner",
    ingredients: ["dough", "cheese", "tomato"],
    rating: 5,
    image: "https://img.freepik.com/premium-photo/pizza-hd-image_1136557-105.jpg"
  },
  {
    name: "Pasta Alfredo",
    category: "Dinner",
    ingredients: ["pasta", "cream", "cheese"],
    rating: 4,
    image: "https://img.freepik.com/free-photo/plate-fettuccine-alfredo-with-fresh-parsley_9975-124881.jpg"
  },
  {
    name: "Fried Rice",
    category: "Dinner",
    ingredients: ["rice", "vegetables", "soy sauce"],
    rating: 4,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/fried-rice.jpg"
  },

  // Dessert
  {
    name: "Brownie",
    category: "Dessert",
    ingredients: ["chocolate", "sugar", "butter"],
    rating: 4,
    image: "https://www.shutterstock.com/image-photo/stack-chocolate-brownies-on-wooden-600nw-2475514651.jpg"
  },
  {
    name: "Ice Cream",
    category: "Dessert",
    ingredients: ["milk", "sugar", "vanilla"],
    rating: 5,
    image: "https://img.freepik.com/premium-photo/scoops-ice-cream-cup-background_488220-1817.jpg"
  },
  {
    name: "Gulab Jamun",
    category: "Dessert",
    ingredients: ["khoya", "sugar", "cardamom"],
    rating: 5,
    image: "https://t3.ftcdn.net/jpg/09/47/78/30/360_F_947783020_9ceQ4s73PqZBSVzo3JKJxob6LcLyPuAJ.jpg"
  }
];

// Initialize recipe count dynamically
document.getElementById("recipe-count").textContent = recipes.length;

function renderRecipes(filtered = recipes) {
  const container = document.getElementById('recipe-container');
  container.innerHTML = "";
  filtered.forEach(recipe => {
    const card = `
      <div class="bg-white p-4 rounded shadow-md">
        <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-40 object-cover rounded mb-2"/>
        <h3 class="text-xl font-bold mb-2">${recipe.name}</h3>
        <p class="mb-1"><strong>Category:</strong> ${recipe.category}</p>
        <p class="mb-1"><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Rating:</strong> ⭐ ${recipe.rating}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

function searchRecipes() {
  const searchVal = document.getElementById("search").value.toLowerCase();
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(searchVal) ||
    r.ingredients.some(i => i.toLowerCase().includes(searchVal))
  );
  renderRecipes(filtered);
}

function filterCategory(category) {
  if (category === "All") {
    renderRecipes();
  } else {
    const filtered = recipes.filter(r => r.category === category);
    renderRecipes(filtered);
  }
}

function openForm() {
  document.getElementById("formPopup").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("formPopup").classList.add("hidden");
}

function addRecipe() {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const ingredients = document.getElementById("ingredients").value.split(",").map(i => i.trim()).filter(i => i);
  const rating = parseInt(document.getElementById("rating").value);
  const imageURL = document.getElementById("imageURL").value.trim();

  if (!name || !category || ingredients.length === 0 || isNaN(rating) || rating < 1 || rating > 5 || !imageURL) {
    alert("Please fill all fields correctly, including a valid image URL.");
    return;
  }

  if (!imageURL.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)) {
    alert("Please enter a valid image URL ending with jpeg, jpg, gif, png, webp, bmp, or svg");
    return;
  }

  recipes.push({
    name,
    category,
    ingredients,
    rating,
    image: imageURL
  });

  // Update the recipe count dynamically
  document.getElementById("recipe-count").textContent = recipes.length;

  renderRecipes();
  closeForm();

  // Clear form inputs
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("imageURL").value = "";
}

function showProfile() {
  // Hide recipe container and category section
  document.getElementById('recipe-container').style.display = 'none';
  document.getElementById('category-section').style.display = 'none';
  document.getElementById('search').style.display = 'none';

  // Hide add recipe form popup if open
  closeForm();

  // Show profile section
  document.getElementById('profile').classList.remove('hidden');
}

function renderRecipesAndShow() {
  renderRecipes();
  // Show recipe container and other sections
  document.getElementById('recipe-container').style.display = 'grid';
  document.getElementById('category-section').style.display = 'block';
  document.getElementById('search').style.display = 'block';
  // Hide profile section
  document.getElementById('profile').classList.add('hidden');
}

// Override Home button click to also hide profile
document.querySelector('button[onclick="renderRecipes()"]').onclick = () => {
  renderRecipesAndShow();
}

// Initial render
renderRecipes();