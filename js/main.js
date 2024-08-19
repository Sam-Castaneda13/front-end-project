'use strict';
// Fetch the data from Monster Hunter
const monstersData = async () => {
  const response = await fetch('https://mhw-db.com/monsters');
  const data = await response.json();
  console.log(data);
  return data;
};
const monsters = monstersData;
console.log(monstersData());
