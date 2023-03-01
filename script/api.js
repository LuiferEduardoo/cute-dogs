// API
const theDogAPI = 'https://api.thedogapi.com/v1';

// LLamado a la API
async function dataFech(API, parameterMethod, data = null, file = null) {
    const options = {
        method: parameterMethod,
        headers: {
            'x-api-key': 'live_kuG26ZJpEyOipdyEOjZcMFeQTWGhfrb4GalgZXthESAqG6AIxEUhZiSh3CavGZhn'
        }
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }else if (file){
        options.body = file;
    }

    const response = await fetch(API, options);

    if (!response.ok) {
        throw new Error(`Error ${response.status} al obtener los datos de la API`);
    }

    return response.json();
}  

// Descargar imagenes
function downloadImg(url) {
    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); 
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a); 
        a.click();
        window.URL.revokeObjectURL(url);
    })

    .catch(() => alert('No se puede descargar la imagen'))

}


// Cambiar icono favorito
function UpdateIconFavorite(element, severalDogs = false) {
    if (severalDogs) {
        element.className = `${element} las la-heart`;
    }else{
        const iconFavorite = document.querySelector(element);
        iconFavorite.className = `${element} las la-heart`;
    }
}

// Función guardar los perros favoritos 
async function saveFavorites(API, id) {
    const data = {
        image_id: id
    }
    await dataFech(API, 'POST', data)
}

// Función mostrar un perro
async function oneDog(limit){
    const elementHTML = document.querySelector('.main-container-luck-img');
    try{
        const data = await dataFech(`${theDogAPI}/images/search`, 'GET');
        let view = `<section>
        <img src="${data[0].url}" alt="Dog" srcset="">
        <div class="icon">
            <button id="download"><i class="las la-cloud-download-alt"></i>Download</button>
            <button id="add-favorite"><i class="las la-bookmark iconFavorite"></i>Favorite</button>
        </div>
        </section>`;
        elementHTML.innerHTML = view;
        const addFavorite = document.getElementById('add-favorite').addEventListener('click', ()=>{
            saveFavorites(`${theDogAPI}/favourites`, data[0].id)
            UpdateIconFavorite('.iconFavorite');
        })

        const download = document.getElementById('download').addEventListener('click', ()=> {
            downloadImg(data[0].url, 'image')
        })
    }
    catch (error){
        elementHTML.innerHTML = error.message;
    }
}

// Función, mostrar un número de perros definidos por el usuario
async function severalDogs() {
    const numberImg = document.getElementById('number-imgs').value || 6;
    const elementHTML = document.querySelector('.main-container-imgs-content');
    try{
        const data = await dataFech(`${theDogAPI}/images/search?limit=${numberImg}`, 'GET');
        elementHTML.innerHTML = "";
        let view = data.forEach(dogs => {
            // Crear el contenedor padre
            const divDogs = document.createElement('div');
            divDogs.classList.add('imgDogs');

            // Crear la imagen
            const img = document.createElement('img');
            img.classList.add('image');
            img.src = `${dogs.url}`;
            img.alt = '';

            // Crear la sección de información
            const section = document.createElement('section');
            section.classList.add('information', 'closee');

            // Crear el ícono de cerrar información
            const iClose = document.createElement('i');
            iClose.classList.add('las', 'la-times', 'close-information-icon');

            // Crear la segunda imagen
            const img2 = document.createElement('img');
            img2.src = `${dogs.url}`;
            img2.alt = 'image';

            // Crear el contenedor de los botones de iconos
            const divIcon = document.createElement('div');
            divIcon.classList.add('icon');

            // Crear el botón de descargar
            const btnDownload = document.createElement('button');
            btnDownload.id = 'download';

            const iDownload = document.createElement('i');
            iDownload.classList.add('las', 'la-cloud-download-alt');

            btnDownload.appendChild(iDownload);
            btnDownload.appendChild(document.createTextNode('Download'));

            // Crear el botón de añadir a favoritos
            const btnFav = document.createElement('button');
            btnFav.id = 'add-favorite';

            const iFav = document.createElement('i');
            iFav.classList.add('las', 'la-bookmark', 'iconFavoriteTwo');

            btnFav.appendChild(iFav);
            btnFav.appendChild(document.createTextNode('Favorite'));

            // Añadir todo al árbol DOM
            divIcon.appendChild(btnDownload);
            divIcon.appendChild(btnFav);

            section.appendChild(iClose);
            section.appendChild(img2);
            section.appendChild(divIcon);

            divDogs.appendChild(img);
            divDogs.appendChild(section);

            elementHTML.appendChild(divDogs);

            // Se muestra la sección de la imagen si se le da click
            img.addEventListener('click', ()=>{
                    section.classList.remove('closee');
                    document.body.classList.add('dark-background');
            });

            // Guardar imagenes en favorito, y cambiar icono del boton de favorito
            btnFav.addEventListener('click', ()=>{
                saveFavorites(`${theDogAPI}/favourites`, dogs.id)
                UpdateIconFavorite(iFav, true);
            })

            btnDownload.addEventListener('click', ()=> {
                downloadImg(data[0].url, 'image')
            })

            //Se oculta la sección de la imagen si se le da click a el icono
            iClose.addEventListener('click', ()=>{
                console.log('HelloS')
                section.classList.add('closee');
                document.body.classList.remove('dark-background');
            })
        });
    }
    catch (error){
        elementHTML.innerHTML = error.message;
    }
}

// Función mostrar los perros favoritos
async function dogsFavourites() {
    const elementHTML = document.querySelector('.option-favorites-content');
    try{
        const data = await dataFech(`${theDogAPI}/favourites`, 'GET');
        elementHTML.innerHTML = "";
        let view = data.forEach(favourites => {
            const div = document.createElement('div');
            div.setAttribute('id', favourites.id); 
            const img = document.createElement('img');
            const i = document.createElement('i');

            img.src = favourites.image.url; 
            i.classList.add('las', 'la-trash');
            i.tabIndex = 0;
            i.addEventListener('click', ()=> {
                deleteFavourites(favourites.id)
            })
            div.appendChild(img)
            div.appendChild(i)
            elementHTML.appendChild(div)
        })
    }
    catch (error){
        elementHTML.innerHTML = error.message;
    }
}

// Función borrar los perros favoritos
async function deleteFavourites(id) {
    try{
        await dataFech(`${theDogAPI}/favourites/${id}`, 'DELETE')
        dogsFavourites()
    }
    catch (error){
        console.log(error.message);
    }
}

// Función subir foto de perro 
async function uploadPhotoDog() {
    const form = document.getElementById('uploadForm');
    const exitUpload = document.querySelector('.exitUpload');
    const formData = new FormData(form);
    console.log(formData.get('file'));
    try{
        exitUpload.innerHTML=`<span>Loading...</span>`;
        const data = await dataFech(`${theDogAPI}/images/upload`, 'POST', null, formData);
        exitUpload.innerHTML="";
        const inserHTML = `<span>Image upload successful!</span>
        <button type="button" id ="add-favorite-thee" class="closee"><i class="las la-bookmark iconFavorite"></i>Add to favorite</button>`
        exitUpload.innerHTML = inserHTML;
        const addFavorite = document.getElementById('add-favorite-thee').addEventListener('click', ()=>{
            saveFavorites(`${theDogAPI}/favourites`, data.id)
            UpdateIconFavorite('.iconFavorite');
        });
    }
    catch(error){
        alert(error); 
    }
}

export default {
    oneDog,
    severalDogs,
    dogsFavourites,
    uploadPhotoDog
};