// interface for Monster
interface Monster {
  id: number;
  name: string;
  type: string;
  description: string;
  locations: [];
}

const $row = document.querySelector('.monster-line');

async function makeMonsters(): Promise<void> {
  if (!$row) throw new Error('Could not load row');
  try {
    const response = await fetch(`https://mhw-db.com/monsters`);
    if (!response.ok) {
      throw new Error('This is not ok');
    }
    const monster = await response.json();
    for (let i = 0; monster.length + 1; i++) {
      console.log(monster[i]);
      const newPage = renderMonster(monster[i]);
      $row.append(newPage);
    }
  } catch (error) {}
}
makeMonsters();

function renderMonster(object: Monster): HTMLDivElement {
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

  const $oneThird = document.createElement('div');
  $oneThird.className = 'column-one-third';

  const $monsterList = document.createElement('div');
  $monsterList.className = 'monster-card';

  const $monImg = document.createElement('img');
  $monImg.className = 'monster-img';
  $monImg.setAttribute('src', `images/icons/${imageUrl}.webp`);

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
