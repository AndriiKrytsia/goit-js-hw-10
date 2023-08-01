import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed, selectMarkup, catsID } from "./cat-api";
import '/node_modules/slim-select/dist/slimselect.css' 
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  pLoader: document.querySelector('.loader'),
  pError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info')
}
const { select, pLoader, pError, catInfo } = refs;


fetchBreeds()
  .then(res => {
    select.innerHTML = res.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`
    }).join('')
    new SlimSelect({
      select: refs.select
    });
  })
  .catch(err => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!)'))
  .finally(() => {
    pLoader.classList.add("is-hidden");
    select.classList.remove("is-hidden");
  });


select.addEventListener('change', () => {
    catInfo.innerHTML = "";
  const valueSelect = select.value;
pLoader.classList.remove("is-hidden");
  fetchCatByBreed(valueSelect)
    .then(img => catsID(img[0].id)
      .then(res => {
      selectMarkup(res, catInfo, pError)
      }))
  .catch(err => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!)'))
  .finally(() => {
    pLoader.classList.add("is-hidden");
  });
})
