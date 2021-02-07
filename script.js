const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    const searchBoxInput = document.getElementById('searchBoxInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ searchBoxInput }`)
        .then(res => res.json())
        .then(data => {
            let foodItemsInnerHtml = document.getElementById('allFoodItems').innerHTML = "";
            let foodIngredientsDetail = document.getElementById('foodIngredientsDetail').innerHTML = ' ';
            const allFoodItems = document.getElementById('allFoodItems');
            data.meals.forEach(fooditem => {
                const foodBox = document.createElement('div')
                foodBox.innerHTML = `
            <img src="${ fooditem.strMealThumb }" onClick="foodDetailsShow(${ fooditem.idMeal })">
            <h1 onClick="foodDetailsShow(${ fooditem.idMeal })" >${ fooditem.strMeal }</h1>
            `;
                foodBox.className = "card";
                allFoodItems.appendChild(foodBox);
            });
        })
        .catch(error => {
            const errorMessage = document.createElement('h3')
            errorMessage.innerHTML = `Please input a valid food name.`;
            allFoodItems.appendChild(errorMessage);
        })
})

let foodDetailsShow = searchBoxInput => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ searchBoxInput }`)
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