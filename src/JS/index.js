import { Notify } from "notiflix";
import '/node_modules/slim-select/dist/slimselect.css' 
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed, catsID } from "./cat-api";
import { selectMarkup } from "./markup";


const refs = {
  select: document.querySelector('.breed-select'),
  selectTypical: document.querySelector('.typical'),
  pLoader: document.querySelector('.loader'),
  pError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info')
}
const { select, pLoader, pError, catInfo, selectTypical } = refs;


fetchBreeds()
  .then(res => {
    select.innerHTML = res.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`
    }).join('')
    new SlimSelect({
      select: refs.select
    });
    selectTypical.classList.remove("is-hidden");
  })
  .catch(err => Notify.failure('Oops! Something went wrong! Try reloading the page!)'))
  .finally(() => {
    pLoader.classList.add("is-hidden");
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
  .catch(err => Notify.failure('Oops! Something went wrong! Try reloading the page!)'))
  .finally(() => {
    pLoader.classList.add("is-hidden");
  });
})
