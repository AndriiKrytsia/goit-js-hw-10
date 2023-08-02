
const BASE_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(res => {
  if (!res.ok) throw new Error(res.status);
      return res.json();
      })
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${ breedId }`)
      .then(res => {
  if (!res.ok) throw new Error(res.status);
      return res.json();
      })
}

export function catsID(id) {
  return fetch(`${BASE_URL}/images/${id}`)
      .then(res => {
  if (!res.ok) throw new Error(res.status);
      return res.json();
      })
};




