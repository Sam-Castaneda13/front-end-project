'use strict';
const $row = document.querySelector('.row');
async function makeMonsters() {
  if (!$row) throw new Error('Could not load row');
  for (let i = 1; i < 59; i++) {
    try {
      const response = await fetch(`https://mhw-db.com/monsters/${i}`);
      if (!response.ok) {
        throw new Error('This is not ok');
      }
      const monster = await response.json();
      console.log(monster);
      const newPage = renderMonster(monster);
      $row.append(newPage);
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
makeMonsters();
function renderMonster(object) {
  /* <div class="row">
        <div class="column-one-third">
          <img src='link' class="monster-img"/>
          <div class="monster-name">
        </div>
        </div>
      This times 3
    */
  object.name = object.name.replace(' ', '-');
  object.name = object.name.replace("'", '-');
  // Starting Dom Creation
  const $oneThird = document.createElement('div');
  $oneThird.className = 'column-one-third';
  const $monsterList = document.createElement('div');
  $monsterList.className = 'monster-card';
  const $monImg = document.createElement('img');
  $monImg.className = 'monster-img';
  $monImg.setAttribute('src', `images/icons/${object.name}.webp`);
  const $monName = document.createElement('div');
  $monName.className = 'monster-name';
  const $monsterName = document.createElement('h2');
  $monsterName.textContent = object.name;
  $oneThird.append($monsterList);
  $monsterList.append($monImg);
  $monsterList.append($monName);
  $monName.append($monsterName);
  return $oneThird;
}
