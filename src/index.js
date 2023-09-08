// 1. чи потрібно розбивати в цьому випадку тогл на дві функції: добавити та забрати клас, стиль?
// 2. чи є сенс винести колбеки then в окремі фенкції?
// 3. чи потрібно в cat-api.js в then викидати помилку?
// 4. чому в тулзах при виборі кота не покахує запроси на сервер?
// 5. як без релоаду сторінки зімітувати помилку запиту?

import { fetchBreeds, fetchCatByBreed } from './cat-api.js'
import {SlimSelect} from 'slim-select' 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
	select: document.querySelector('.breed-select'),
	catInfo: document.querySelector('.cat-info'),
	loader: document.querySelector('.loader'),
	error: document.querySelector('.error'),
}

// initial condition
toggleElement(refs.select); // 'none'
toggleElement(refs.error); // 'none'

// first query
fetchBreeds().then(arr => {

	renderSelectMarkup(arr, refs.select);

	toggleElement(refs.select); // 'block'
	toggleElement(refs.loader); // 'none'

	refs.select.addEventListener('change', () => {
		
		if(refs.error.style.display === 'block') toggleElement(refs.error); // 'none'
		toggleElement(refs.catInfo); // 'none'
		toggleElement(refs.loader); // 'block'

		const breed_ids = refs.select.value;
		fetchCatByBreed(breed_ids).then(res => {

			toggleElement(refs.loader); // 'none'
			toggleElement(refs.catInfo); // 'block'

			renderCat(res, refs.catInfo);
		}).catch(error => {
			toggleElement(refs.loader); // 'none'
			toggleElement(refs.error); // 'block'
			Notify.failure(`${error}`);
		});
	});
}).catch(error => {
	toggleElement(refs.loader); // 'none'
	toggleElement(refs.error); // 'block'
	Notify.failure(`${error}`);
});

function renderSelectMarkup(arr, container) {
	container.innerHTML = arr.map(item =>
		`<option value="${item.id}">${item.name}</option>`
		).join('');
}

function renderCat(cat, container) {
	container.innerHTML = `<img src="${cat[0].url}" width="100%">
	<h1 style="margin:0">${cat[0].breeds[0].name}</h1>
	<p>${cat[0].breeds[0].description}</p>
	<p><strong>Temperament: </strong>${cat[0].breeds[0].temperament}</p>`
}

function toggleElement(element) {
	element.style.display = element.style.display === 'none'
		? 'block'
		: 'none';
}