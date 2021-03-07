function loadItems() {
  let inputKeyword = document.getElementById("input-keyword").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputKeyword}`)
    .then((res) => res.json())
    .then((data) => {
      displayItems(data.meals);
    });
}
document.getElementById("btn-search").addEventListener("click", function () {
  loadItems();
});

function displayItems(foodItems) {
  let itemContainer = document.getElementById("items");
  if (foodItems) {
    foodItems.forEach((food) => {
      let foodCart = document.createElement("div");
      foodCart.className = "col-md-3";
      foodCart.innerHTML = `<div onclick="getDetails(${food.idMeal})" class="inner-food-cart shadow-sm p-3 mb-5 bg-body rounded""> <img class="w-50 rounded mb-2" src="${food.strMealThumb}"/> <h6>${food.strMeal}</h6> </div>`;
      itemContainer.appendChild(foodCart);
    });
  } else {
    itemContainer.innerHTML = `<h3>There is no such meal!!!use another keyword please...</h3>`;
  }
}
function getDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data.meals[0]));
}
function showDetails(food) {
  const foodDetail = document.getElementById("food-detail");
  foodDetail.className = "food-detail";
  let {
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
  } = food;
  // console.log(strArea, strCategory, strMeal, strIngredient1);
  // console.log(food);
  foodDetail.innerHTML = `<img class="w-25 rounded" src="${strMealThumb}"/> <h4>${strMeal}</h4> <h5>category: ${strCategory}</h5> <h6>region: ${strArea}</h6> 
  <p>basic ingredients: ${strIngredient1}, ${strIngredient2}, ${strIngredient3}</p>`;
}
