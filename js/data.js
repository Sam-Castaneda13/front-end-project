'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* exported data */
let data = {
  favorite: [],
};
function writeData() {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('Entries', dataJson);
}
function readData() {
  const JSONData = localStorage.getItem('Entries');
  if (JSONData) {
    return JSON.parse(JSONData);
  } else {
    return { favorite: [] };
  }
}
data = readData();
