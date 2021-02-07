const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    const searchBoxInput = document.getElementById('searchBoxInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ searchBoxInput }`)
        .then(res => res.json())
        .then(data => {
            let foodItemsInnerHtml = document.getElementById('allFoodItems').innerHTML = "";
            document.getElementById('foodIngredientsDetail').innerHTML = ' ';
            const allFoodItems = document.getElementById('allFoodItems');
            data.meals.forEach(fooditem => {
                const foodBox = document.createElement('div')
                foodBox.innerHTML = `
            <img src="${ fooditem.strMealThumb }" onClick="foodDetailsShow(${ fooditem.idMeal })">
            <h3 onClick="foodDetailsShow(${ fooditem.idMeal })" >${ fooditem.strMeal }</h3>
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
            let foodItemData = document.getElementById('foodIngredientsDetail');
            document.getElementById('foodIngredientsDetail').innerHTML = ' ';
            document.getElementById('foodIngredientsDetail').style.display = 'block';
            let foodIngredientsDetail = document.createElement('div')
            foodIngredientsDetail.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h4>Ingredients:</h4>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient1}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient2}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient3}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient4}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient5}</p>
            <p><span class="ingredient">.</span>${data.meals[0].strIngredient6}</p>
            `;
            foodIngredientsDetail.className = "food-items-details";
            foodItemData.appendChild(foodIngredientsDetail);
        })
}