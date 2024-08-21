'use strict';
const $row = document.querySelector('#monster-line');
const $monDetailImg = document.querySelector('.mon-img');
const $nameMon = document.querySelector('.mon-name');
const $monDescription = document.querySelector('.mon-descrip-in');
const $monType = document.querySelector('.mon-type-in');
const $monSpecies = document.querySelector('.mon-species-in');
const $monLocations = document.querySelector('.mon-locations-in');
const $monLine = document.querySelector('#monster-line');
const $monSelect = document.querySelector('#monster-select');
const $monsterPage = document.querySelector('#monsters-tab');
if (!$monLine) throw new Error('Could not load Line');
if (!$monSelect) throw new Error('Could not load Select');
const $monChoice = document.querySelector('#monster-line');
if (!$monChoice) throw new Error('could not load a elements');
async function makeMonsters() {
  if (!$row) throw new Error('Could not load row');
  try {
    const response = await fetch(`https://mhw-db.com/monsters`);
    if (!response.ok) {
      throw new Error('Could not load the response');
    }
    const monster = await response.json();
    for (let i = 0; monster.length + 1; i++) {
      const newPage = renderMonster(monster[i]);
      $row.append(newPage);
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
  if (!$eventTarget.closest('.monster-card')) return;
  const $monsterCard = $eventTarget.closest('.monster-card');
  if (!$monsterCard) return;
  const monsterId = $monsterCard.getAttribute('data-monster-id');
  try {
    const response = await fetch(`https://mhw-db.com/monsters/${monsterId}`);
    if (!response.ok) {
      throw new Error('Could not load the response');
    }
    const $monDet = await response.json();
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
});
