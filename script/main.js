import items from './items.js';
import apiDog from './api.js';
function readingFunction(nameFunction) {
    document.addEventListener('DOMContentLoaded', nameFunction);
}
readingFunction(apiDog.oneDog);
readingFunction(apiDog.severalDogs);

const buttonFavorites = document.getElementById('button-favorites').addEventListener('click', ()=>{
    items.open(items.optionFavorites)
    apiDog.dogsFavourites();
});

const buttonUpload = document.getElementById('button-upload').addEventListener('click', ()=>{items.open(items.optionUpload)});

const closeFavorites = document.querySelector('.close-favorites').addEventListener('click', () => {items.close(items.optionFavorites)})
const closeUpload = document.querySelector('.close-upload').addEventListener('click', () => {items.close(items.optionUpload)})

items.navIconOpenMobile.addEventListener('click', ()=> {items.toggleMenu(items.navIconOpenMobile, items.navIconCloseMobile, '100%')})
items.navIconCloseMobile.addEventListener('click', ()=> {items.toggleMenu(items.navIconCloseMobile, items.navIconOpenMobile, '')})

const buttonLuck = document.getElementById('luck').addEventListener('click', ()=>{
    apiDog.oneDog();
});

const buttonImg = document.getElementById('button-add').addEventListener('click', () =>{
    apiDog.severalDogs();
}); 

const buttonUploadDog = document.getElementById('buttonUpload').addEventListener('click', ()=> {
    apiDog.uploadPhotoDog();
});

const inputFile = document.querySelector('input[type="file"]').addEventListener('change', ()=> {
    items.previewImage();
})
