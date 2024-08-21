/* eslint-disable @typescript-eslint/no-unused-vars */
/* exported data */

interface Monster {
  name: string;
  photoURL: string;
  id: number;
}

interface Data {
  favorite: Monster[];
}

let data: Data = {
  favorite: [],
};

function writeData(): void {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('Entries', dataJson);
}

function readData(): Data {
  const JSONData = localStorage.getItem('Entries');
  if (JSONData) {
    return JSON.parse(JSONData);
  } else {
    return { favorite: [] };
  }
}

data = readData();
