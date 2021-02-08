const mealInput = document.getElementById('input-meal');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => mealsData(mealInput.value))
const mealsData = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => showMeals(data.meals))
}
const showMeals = mealsData => {
    const mealsInfo = document.getElementById('meals-info');
    mealsInfo.innerHTML = '';
    const mealsContainer = document.getElementById('snack-eat');
    mealsContainer.innerHTML = '';
    const empty = document.getElementById('empty-found');
    empty.innerText = '';
    if (mealsData) {
        mealsData.forEach(meal => {
            const snackEat = document.createElement('div');
            snackEat.className = 'col p-3';
            const mealInfo = `
                <div onclick="getInfo(${meal.idMeal})" class="card border-0 rounded-3" style="width: 20rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top">
                    <div class="card-body bg-light">
                        <h3 class="card-title text-center">${meal.strMeal}</h3>
                    </div>
                </div>
            `;
            snackEat.innerHTML = mealInfo;
            mealsContainer.appendChild(snackEat);
        });
    } else {
        empty.innerText = `Meal not found for`;
    }
}
const getInfo = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => showMealsInfo(data.meals[0]));
}
const showMealsInfo = info => {
    const mealsInfo = document.getElementById('meals-info');
    mealsInfo.innerHTML = `
        <div class="d-flex justify-content-center mb-5">
            <div class="card w-75 border-0 rounded-3 meal-info">
                <img src="${info.strMealThumb}" class="card-img-top">
                <div class="card-body bg-light">
                    <h1 class="mb-4">${info.strMeal}</h1>
                    <h4 class="card-text mb-4">Ingredients</h4>
                    <p><img src="images/checkmark.png">${info.strMeasure1} ${info.strIngredient1}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure2} ${info.strIngredient2}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure3} ${info.strIngredient3}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure4} ${info.strIngredient4}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure5} ${info.strIngredient5}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure6} ${info.strIngredient6}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure7} ${info.strIngredient7}</p>
                    <p><img src="images/checkmark.png">${info.strMeasure8} ${info.strIngredient8}</p>
                </div>
            </div>
        </div>
        `;
}