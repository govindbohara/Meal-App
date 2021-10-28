import { debounce } from 'debounce';
import { showError } from './util';

const input = document.querySelector('#input');
const dropDown = document.querySelector('.dropdown-container');
const fullcontainer = document.querySelector('.full-cont');

// const label = document.querySelector('.label');

const fetchById = async mealId => {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const { meals } = await response.json();
    return meals;
};
const renderFullDetails = fullDetails => {
    fullcontainer.innerHTML = ` <img src= ${fullDetails[0].strMealThumb}><div class='info'><h1 class='mealname' >${fullDetails[0].strMeal}</h1>
    <p class='ingredients'>${fullDetails[0].strInstructions}</p>
    <button class= "link"><a href="${fullDetails[0].strYoutube}" target="_blank">Go to youtube video</a></button></div>
    `;
};

const render = meals => {
    dropDown.style.display = meals.length > 0 ? 'block' : 'none';
    dropDown.innerHTML = meals
        .map(
            abc => `<div class='dropdown-item' data-id=${abc.idMeal}>
        <img src='${abc.strMealThumb}'/>
        <h1 class='heading'>${abc.strMeal}</h1></div>
        `
        )
        .join('');
    fullcontainer.innerHTML = '';
    const headings = document.querySelectorAll('.heading');
    headings.forEach(heading => {
        heading.addEventListener('click', async () => {
            dropDown.style.display = 'none';
            const fullDetails = await fetchById(heading.parentElement.dataset.id);
            renderFullDetails(fullDetails);
        });
    });
};
const fetchData = async mealName => {
    if (mealName) {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );
        const { meals } = await response.json();
        if (!meals) {
            showError(`No search results found for ${mealName}`);
        }
        render(meals || []);
    } else {
        dropDown.style.display = 'none';
    }
};
const onInput = e => {
    fetchData(e.target.value);
};
input.addEventListener('input', debounce(onInput, 500));
