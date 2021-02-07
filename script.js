const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    const foodName = document.getElementById('searchBoxInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ foodName }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('allFoodItems').innerHTML = "";
            document.getElementById('foodIngredientsDetail').innerHTML = ' ';
            const foods = document.getElementById('allFoodItems');
            data.meals.forEach(element => {
                const food = document.createElement('div')
                food.innerHTML = `
            <img src="${ element.strMealThumb }" onClick="foodDetailsShow(${ element.idMeal })">
            <h1 onClick="foodDetailsShow(${ element.idMeal })" >${ element.strMeal }</h1>
            `;
                food.className = "card";
                foods.appendChild(food);
            });
        })
        .catch(error => {
            const errorMessage = document.createElement('h3')
            errorMessage.innerHTML = `Please input a valid food name.`;
            foods.appendChild(errorMessage);
        })
})

let foodDetailsShow = foodName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ foodName }`)
        .then(res => res.json())
        .then(data => {
            let foodData = document.getElementById('foodIngredientsDetail');
            document.getElementById('foodIngredientsDetail').innerHTML = ' ';
            document.getElementById('foodIngredientsDetail').style.display = 'block';
            let foodDetails = document.createElement('div')
            foodDetails.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h1>Ingredients:</h1>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient1}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient2}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient3}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient4}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient5}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient6}</p>
            `;
            foodDetails.className = "food-details";
            foodData.appendChild(foodDetails);
        })
}