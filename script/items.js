// Se traen los elementos que se van a ocultar o monstrar
const optionFavorites = document.querySelector('.option-favorites');
const optionUpload = document.querySelector('.option-upload');
const navIconOpenMobile = document.querySelector('.nav-icon-open-mobile');
const navIconCloseMobile = document.querySelector('.nav-icon-close-mobile');
const navOptionUl = document.querySelector('.nav-option ul');
const nav = document.querySelector('nav');
const informationImg = document.querySelector('.information');

// Función que abre el elemento
function open(factor){
    factor.classList.remove('closee');
    document.body.classList.add('dark-background');
    if (nav.style.height == '100%'){
        toggleMenu(navIconCloseMobile, navIconOpenMobile, '');
    }
    if (factor == optionFavorites){
        close(optionUpload);
        document.body.classList.add('dark-background');
    } else if (factor == optionUpload){
        close(optionFavorites);
        document.body.classList.add('dark-background');
    }
}

// Función que cierra el elemento
function close(factor){
    factor.classList.add('closee');
    document.body.classList.remove('dark-background');
}

// Función toggle del menu
function toggleMenu(iconHide, iconShow, height){
    navOptionUl.classList.toggle('close-menu');
    iconHide.style.display = 'none'
    iconShow.style.display = 'block'
    nav.style.height = height;
    if (nav.style.height == '100%') {
        close(optionUpload);
        close(optionFavorites);
    }
}

function previewImage() {
    const inputFile = document.querySelector('input[type="file"]')
    const form = document.getElementById('uploadForm')
    const buttonUpload = document.getElementById('buttonUpload');
    if (inputFile.files.length > 0) {
        const formData = new FormData(form)
        //usamos el FileReader para sacar la información del archivo del formData
        const reader = new FileReader();

        //aquí sucede la magia, el reader lee los datos del form.
        reader.readAsDataURL(formData.get('file'))
        console.log(inputFile.files[0].name);
    
        const preview = document.getElementById('preview')
        //Éste código es para cuando termine de leer la info de la form, asigne el src a la imagen, y se muestre el boton de enviar.
        reader.onload = () => {
            const exitUpload = document.querySelector('.exitUpload');
            const previewImage = document.getElementById('previewImg');
            const iborraInputFile = document.querySelector('.iborrainputfile')
            previewImage.src = reader.result
            iborraInputFile.textContent = inputFile.files[0].name;
            buttonUpload.classList.remove('closee')
            exitUpload.innerHTML = '';
        }
    }
}

// Se exportan las función y variables
export default{
    open,
    close,
    toggleMenu,
    optionFavorites,
    optionUpload,
    navIconOpenMobile,
    navIconCloseMobile,
    navOptionUl,
    nav,
    informationImg,
    previewImage
}