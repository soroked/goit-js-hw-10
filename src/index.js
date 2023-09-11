//  .is-hidden {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   margin: -1px;
//   border: 0;
//   padding: 0;

//   white-space: nowrap;
//   clip-path: inset(100%);
//   clip: rect(0 0 0 0);
//   overflow: hidden;
// }

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js'
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css'
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

	refs.select.classList.remove('is-hidden');
	refs.loader.classList.add('is-hidden');

	new SlimSelect({
		select: refs.select,
		settings: {
			placeholderText: 'Search',
		}
	})

	refs.select.addEventListener('change', handleCatSearch);

}).catch(() => {
	refs.loader.classList.add('is-hidden');
	refs.error.classList.remove('is-hidden');
	Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
});

function handleCatSearch() {
		
	refs.error.classList.add('is-hidden');
	refs.catInfo.classList.add('is-hidden');
	refs.loader.classList.remove('is-hidden');

	const breed_ids = refs.select.value;
	fetchCatByBreed(breed_ids).then(res => {

		refs.loader.classList.add('is-hidden');
		refs.catInfo.classList.remove('is-hidden');

		renderCat(res, refs.catInfo);
	}).catch(() => {
		refs.loader.classList.add('is-hidden');
		refs.error.classList.remove('is-hidden');
		Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
	});
}

function renderSelectMarkup(arr, container) {
	container.insertAdjacentHTML('beforeend', arr.map(item =>
		`<option value="${item.id}">${item.name}</option>`
		).join(''))
}

function renderCat(cat, container) {
	container.innerHTML = `<img src="${cat[0].url}" width="50%"
    style="float:left; padding:10px; object-fit:contain">
	<h1>${cat[0].breeds[0].name}</h1>
	<p>${cat[0].breeds[0].description}</p>
	<p><strong>Temperament: </strong>${cat[0].breeds[0].temperament}</p>`
}