// 1. як без релоаду сторінки зімітувати помилку запиту? --disable-hmr
// 2. елементи приховую через інлайн стилі display none та показую через display block. все прописано у функціях showElement та hideElement нижче. це ок?

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
	select: document.querySelector('.breed-select'),
	catInfo: document.querySelector('.cat-info'),
	loader: document.querySelector('.loader'),
	error: document.querySelector('.error'),
}

// first query
fetchBreeds().then(arr => {

	renderSelectMarkup(arr, refs.select);

	showElement(refs.select); // 'block'
	hideElement(refs.loader); // 'none'

	refs.select.addEventListener('change', () => {
		
		hideElement(refs.error); // 'none'
		hideElement(refs.catInfo); // 'none'
		showElement(refs.loader); // 'block'

		const breed_ids = refs.select.value;
		fetchCatByBreed(breed_ids).then(res => {

			hideElement(refs.loader); // 'none'
			showElement(refs.catInfo); // 'block'

			renderCat(res, refs.catInfo);
		}).catch(() => {
			hideElement(refs.loader); // 'none'
			showElement(refs.error); // 'block'
			Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
		});
	});
}).catch(() => {
	hideElement(refs.loader); // 'none'
	showElement(refs.error); // 'block'
	Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
});

function renderSelectMarkup(arr, container) {
	container.innerHTML = arr.map(item =>
		`<option value="${item.id}">${item.name}</option>`
		).join('');
}

function renderCat(cat, container) {
	container.innerHTML = `<img src="${cat[0].url}" width="50%"
    style="float:left; padding:10px; object-fit:contain">
	<h1>${cat[0].breeds[0].name}</h1>
	<p>${cat[0].breeds[0].description}</p>
	<p><strong>Temperament: </strong>${cat[0].breeds[0].temperament}</p>`
}

// function toggleElement(element) {
// 	element.style.display = element.style.display === 'none'
// 		? 'block'
// 		: 'none';
// }

function showElement(element) {
	element.style.display = 'block';
}

function hideElement(element) {
	element.style.display = 'none';
}