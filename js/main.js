'use strict';
const $estrella = document.querySelector('.estrella');
const $monFavCon = document.querySelector('#monster-favorites');
const $monDetailImg = document.querySelector('.mon-img');
const $monTitle = document.querySelector('.title');
const $favTitle = document.querySelector('.title-fav');
const $nameMon = document.querySelector('.mon-name');
const $monDescription = document.querySelector('.mon-descrip-in');
const $monType = document.querySelector('.mon-type-in');
const $monSpecies = document.querySelector('.mon-species-in');
const $monLocations = document.querySelector('.mon-locations-in');
const $monLine = document.querySelector('#monster-line');
const $monSelect = document.querySelector('#monster-select');
const $monFav = document.querySelector('.favorite-page');
const $monsterPage = document.querySelector('#monsters-tab');
const $filter = document.querySelector('.filter');
const $star = document.querySelector('.star-favorite');
const $favoriteTab = document.querySelector('#favorite-tab');
if (!$monLine) throw new Error('Could not load Line');
if (!$monFav) throw new Error('Could not load Favorite');
if (!$monSelect) throw new Error('Could not load Select');
if (!$star) throw new Error('could not load star');
if (!$filter) throw new Error('could not load filter');
if (!$nameMon) throw new Error('could not load monsters name');
const $monChoice = document.querySelector('#monster-line');
if (!$monChoice) throw new Error('could not load a elements');
if (!$monFavCon) throw new Error('could not load a elements');
async function makeMonsters() {
  if (!$monChoice) throw new Error('Could not load row');
  try {
    const response = await fetch(`https://mhw-db.com/monsters`);
    if (!response.ok) {
      throw new Error('Could not load the response');
    }
    const monster = await response.json();
    for (let i = 0; monster.length + 1; i++) {
      const newPage = renderMonster(monster[i]);
      $monChoice.append(newPage);
    }
  } catch (error) {}
}
makeMonsters();
function renderMonster(object) {
  /* <div class="row">
        <div class="column-one-third">
          <img src='link' class="monster-img"/>
          <div class="monster-name">
        </div>
    */
  let imageUrl = object.name;
  if (object.name.includes(' ')) {
    imageUrl = object.name.replace(' ', '-');
  }
  if (object.name.includes("'")) {
    imageUrl = object.name.replace("'", '-');
  }
  const $monsterList = document.createElement('div');
  $monsterList.className = 'monster-card column-one-third';
  $monsterList.setAttribute('id', 'green');
  $monsterList.setAttribute('data-monster-id', object.id.toString());
  const $monImg = document.createElement('img');
  $monImg.className = 'monster-img';
  $monImg.setAttribute('src', `images/icons/${imageUrl}.webp`);
  $monImg.setAttribute('name', object.name);
  const $monName = document.createElement('div');
  $monName.className = 'monster-name';
  const $monsterName = document.createElement('a');
  $monsterName.textContent = object.name;
  $monsterName.setAttribute('name', 'plzwork');
  $monsterList.appendChild($monImg);
  $monsterList.appendChild($monName);
  $monName.appendChild($monsterName);
  return $monsterList;
}
$monChoice.addEventListener('click', monsterDetails);
$monFavCon.addEventListener('click', monsterDetails);
async function monsterDetails(event) {
  const $eventTarget = event.target;
  if (!$monDetailImg) throw new Error('Could not load img element');
  if (!$monDescription) throw new Error('Could not load description');
  if (!$monType) throw new Error('Could not load type');
  if (!$monSpecies) throw new Error('Could not load species');
  if (!$nameMon) throw new Error('Could not load name');
  if (!$monLocations) throw new Error('Could not load locations');
  if (!$monLine) throw new Error('Could not load Line');
  if (!$monSelect) throw new Error('Could not load Select');
  if (!$star) throw new Error('could not load star');
  if (!$filter) throw new Error('could not load filter');
  if (!$eventTarget.closest('.monster-card')) return;
  const $monsterCard = $eventTarget.closest('.monster-card');
  if (!$monsterCard) return;
  const monsterId = $monsterCard.getAttribute('data-monster-id');
  if (!monsterId) return;
  try {
    const response = await fetch(`https://mhw-db.com/monsters/${monsterId}`);
    if (!response.ok) {
      throw new Error('Could not load the response');
    }
    const $monDet = await response.json();
    $nameMon.setAttribute('id', monsterId);
    const img = imgChanger($monDet);
    $monDetailImg.setAttribute('src', `images/renders/${img}.webp`);
    $nameMon.textContent = $monDet.name;
    $monDescription.textContent = $monDet.description;
    $monType.textContent = $monDet.type;
    $monSpecies.textContent = $monDet.species;
    const trys = $monDet.locations;
    let monsterLoc = '';
    for (let i = 0; i < trys.length; i++) {
      if (i < trys.length - 1) {
        monsterLoc += `${trys[i].name}, `;
      } else {
        monsterLoc += `${trys[i].name} `;
      }
    }
    $monLocations.textContent = monsterLoc;
    $monLine.classList.add('hidden');
    $monSelect.classList.remove('hidden');
    $filter.classList.add('hidden');
    $star.classList.remove('hidden');
    $monFav?.classList.add('hidden');
    for (let i = 0; i < data.favorite.length; i++) {
      if (data.favorite[i].id === Number(monsterId)) {
        $star?.classList.add('favorite');
      }
    }
  } catch (error) {}
}
function imgChanger(object) {
  let imageUrl = object.name;
  if (object.name.includes(' ')) {
    imageUrl = object.name.replace(' ', '-');
  }
  if (object.name.includes("'")) {
    imageUrl = object.name.replace("'", '-');
  }
  return imageUrl;
}
if (!$monsterPage) throw new Error('Could not load Monster Page');
$monsterPage.addEventListener('click', function () {
  $monLine.classList.remove('hidden');
  $monSelect.classList.add('hidden');
  $monFav.classList.add('hidden');
  $favoriteTab?.classList.remove('selected');
  $monsterPage.classList.add('selected');
  $favTitle?.classList.add('hidden');
  $monTitle?.classList.remove('hidden');
  $filter.classList.remove('hidden');
  $star.classList.add('hidden');
  $star?.classList.remove('favorite');
});
if (!$estrella) throw new Error('could not load favorite star click');
$estrella.addEventListener('click', function () {
  if ($star.classList[1] === 'favorite') {
    removeFav();
  } else if ($star.classList[1] !== 'favorite') {
    favMon();
  }
});
function removeFav() {
  const $card = document.querySelector('.monster-card');
  if (!$nameMon) throw new Error('Could not load name');
  if (!$card) throw new Error('Could not load name');
  if (!$monFavCon?.firstChild)
    throw new Error('could not load the first child element');
  if (!$nameMon.textContent) throw new Error('Could not load name');
  $star?.classList.remove('favorite');
  for (let i = 0; i < data.favorite.length; i++) {
    if (Number($nameMon.id) === data.favorite[i].id) {
      data.favorite.splice(i, 1);
    }
  }
  writeData();
  if (!$monFav) throw new Error('could not load monster fav page');
  const $cardToRemove = $monFav.querySelector(
    `[data-monster-id='${Number($nameMon.id)}']`,
  );
  $cardToRemove?.remove();
}
function favMon() {
  if (!$nameMon) throw new Error('Could not load name');
  if (!$nameMon.textContent) throw new Error('Could not load name');
  for (let i = 0; i < data.favorite.length; i++) {
    if ($nameMon.textContent === data.favorite[i].name) {
      return;
    }
  }
  $star?.classList.add('favorite');
  data.favorite.push({
    name: $nameMon.textContent,
    photoURL: `images/icons/${$nameMon.textContent}.webp`,
    id: Number($nameMon.id),
  });
  writeData();
  readData();
  loader();
}
function loader() {
  if (!$monFavCon) throw new Error('Could not load row');
  const i = data.favorite.length - 1;
  const $data = renderMonster(data.favorite[i]);
  $monFavCon.append($data);
}
if (!$favoriteTab) throw new Error('Could not load Monster Page');
$favoriteTab.addEventListener('click', function () {
  $monLine.classList.add('hidden');
  $monSelect.classList.add('hidden');
  $monFav.classList.remove('hidden');
  $favoriteTab?.classList.add('selected');
  $monsterPage.classList.remove('selected');
  $favTitle?.classList.remove('hidden');
  $monTitle?.classList.add('hidden');
  $filter.classList.remove('hidden');
  $star.classList.add('hidden');
  $star?.classList.remove('favorite');
});
document.addEventListener('DOMContentLoaded', domTree);
function domTree() {
  if (!$monFavCon) throw new Error('Could not load row');
  for (let i = 0; i < data.favorite.length; i++) {
    const $data = renderMonster(data.favorite[i]);
    $monFavCon.append($data);
  }
}
