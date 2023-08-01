

const SELECT_CATS = 'https://api.thecatapi.com/v1/breeds';
const DESCRIPTION_CATS = 'https://api.thecatapi.com/v1/images/search';


export function fetchBreeds() {
  return fetch(SELECT_CATS)
    .then(res => {
  if (!res.ok) throw new Error(res.status);
      return res.json();
      })
}

export function fetchCatByBreed(breedId) {
  return fetch(DESCRIPTION_CATS + '?breed_ids=' + breedId)
    .then(res => res.json()) 
}

export function catsID(id) {
  return fetch(`https://api.thecatapi.com/v1/images/${id}`)
    .then(res => res.json())
};

export function selectMarkup(cat, catInfo) {
  const markup = `<img class="cat-img" src="${cat.url}" width="340"/>
                  <div class="cat-description">
                  <h2>${cat.breeds[0].name}</h2>
                  <p>${cat.breeds[0].description}</p>
                  <p><h3>Temperament:</h3> ${cat.breeds[0].temperament}</p>
              </div>`;
  catInfo.innerHTML = markup;
};


