// Para importar el css global se hace asi:
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { cardFile } from './js/components/file';
import { secondBox } from './js/components/second-box';
import { firstBox } from './js/components/first-box';

// TODO: TRATAR DE MODULARIZAR EL CODIGO
// Implementar cambio de vista del mainBox cuando tenga archivos cargados(se cambiara si se detecta que hay archivos cargados en la aplicacion)

// Obtenemos la zona de dropeo de elementos (EN ESTE CASO SERA UN ARCHIVO)
const mainBox = document.querySelector('.principal_box');
// Inputfile para seleccionar archivos manualmente
const inputFile = document.querySelector('#fileElem');
// Boton que acciona el inputFile (PARA EVITAR USAR EL TEXTO PREDEFINIDO DEL INPUT FILE)
const btnSelectFile = document.querySelector('#btnSelectFile');
// Array que almacenara todos los archivos cargados hasta el momento, para su posterior subida
let archivosCargados = [];

// Evento de dropeo de elementos (EXCLUSIVO PARA CUANDO YA SE HAYAN DROPEADO COSAS)
mainBox.addEventListener('drop', (e) => {
    // Se evalua si se dropearon archivos
    if (!!e.dataTransfer.files) {
        // Esperamos un true en caso de que el handler haya cargado archivos al array principal
        const res = manejarArchivos([...e.dataTransfer.files])
        // Y en ese caso, ejecutamos la funcion que cambia la vista del mainBox (CON LOS ARCHIVOS LISTOS PARA SER ENVIADOS)
        if (res) mostrarArchivosCargados();
    }
}, false)

// Eventos para el cambio de diseño del mainBox (PARA CUANDO SE ESTEN ARRASTRANDO ARCHIVOS)
;['dragenter', 'dragover'].forEach(eventName => {
    mainBox.addEventListener(eventName, arrastreActivo, false)
})
function arrastreActivo() {
    this.classList.add('file-dragged-in_1');
}

// Eventos para el cambio de diseño del mainBox (PARA CUANDO NO SE ESTEN ARRASTRANDO ARCHIVOS en la dropzone o ya se hayan dropeado)
;['dragleave', 'drop'].forEach(eventName => {
    mainBox.addEventListener(eventName, arrastreNoActivo, false)
})
function arrastreNoActivo() {
    this.classList.remove('file-dragged-in_1');
}

// Eventos para cuando se seleccionen archivos desde el input file
/* El primero se encarga de accionar el inputfile desde este boton: */
// Evaluamos que exista el elemento con el '?'
btnSelectFile?.addEventListener('click', () => inputFile.click());
/* El segundo manda el archivo al handle: */
inputFile?.addEventListener('change', function () {
    // Esperamos un true en caso de que el handler haya cargado archivos al array principal
    const res = manejarArchivos([...this.files])
    this.type = "text";
    this.type = "file";
    // Y en ese caso, ejecutamos la funcion que cambia la vista del mainBox (CON LOS ARCHIVOS LISTOS PARA SER ENVIADOS)
    if (res) mostrarArchivosCargados();
});

// Funcion para cargar archivos al array de archivos listos para enviar
/*
    * Se ejecuta cada vez que se dropean archivos al mainBox
    * Tambien se ejecuta cuando selecionamos un archivo desde el inputFile
    * Esta funcion es la UNICA EN DETECTAR CAMBIOS EN EL ARRAY PRINCIPAL DE ARCHIVOS
*/
function manejarArchivos(files) {

    // Se crean dos array para separar archivos validos (JPG y max 5mb) y no validos (No JPG y/o mas de 5mb)
    const allowedFiles = []
    const notAllowedFiles = []

    // Analizamos cada elemento del array de archivos, para evaluar si cumplen las condiciones anteriormente dichas
    for (const file of files) {
        if (file.type == 'image/jpeg' && file.size <= 5000000) {
            // Si cumplen las condiciones, se manda al array de archivos permitidos
            allowedFiles.push(file)
        } else {
            // Caso contrario, se manda al array de archivos no permitidos
            notAllowedFiles.push(file)
        }
    }

    // Luego en caso de que el array de archivos no permitidos tenga algun elemento, mostraremos un alert indicando lo siguiente:
    if (notAllowedFiles.length > 0) alert('Solo archivos JPG y max 5mb por archivo')

    // Si hayb archivos validos, se evaluara esta condicion
    if (allowedFiles.length > 0) {
        // Y en caso de que la cantidad de elementos del array de archivos validos, sumada a cantidad de archivos ya cargados a la lista de archivos listos para subir, sea 6
        // se van a pushear en su totalidad a este ultimo array.
        if (archivosCargados.length + allowedFiles.length <= 6) {
            allowedFiles.forEach(file => archivosCargados.push(file));
        } else {
            // Caso contrario, solo se van a pushear la cantidad de elementos restantes, evaluando la diferencia de 6 menos la cantidad de elementos que tenga el array
            // de archivos ya cargados.
            let cont = 6 - archivosCargados.length;
            // Hasta que el contador no sea 0, se seguiran pusheando los archivos al array principal.
            while (cont > 0) {
                archivosCargados.push(allowedFiles[cont - 1])
                cont--
            }
            // Y terminamos mostrando un alert que indique lo siguiente (YA QUE HUBO UN EXCESO DE ARCHIVOS)
            alert('Solo se permiten 6 archivos')
        }
        // Retornamos true ya que se cargaron archivos al array principal
        return true;
    }
}


// Definimos los preventDefaults necesarios para los eventos implementados (EN ESTE CASO SERA PARA dragenter, dragover, dragleave y drop)
// Estos evitaran que se disparen eventos repetidos
const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop'];
eventNames.forEach(eventName => {
    mainBox.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

// Funcion que muestra los archivos cargados en el array principal (ESTOS SON ARCHIVOS VALIDOS Y LISTOS PARA SUBIR)
/*
    * Se ejecuta cada que el array principal de archivos recibe un nuevo elemento (ya sea dropeando elementos validos o seleccionando archivos validos desde el inputFile)
    * Tambien se ejecuta cada que se elimina un archivo del array principal
*/
function mostrarArchivosCargados() {
    const cardRenders = archivosCargados.map(archivo => cardFile(archivo));
    const finalBox = secondBox(cardRenders);
    console.log(finalBox);
    if (archivosCargados.length > 0) mainBox.classList.add('file-dragged-in_1_with-files');
    mainBox.innerHTML = ''
    mainBox.appendChild(finalBox)
    createDeleteFileEvents(document.querySelectorAll('.delete-button'))
}

function createDeleteFileEvents(deleteFileButtons) {
    deleteFileButtons.forEach(button => {
        button.addEventListener('click', () => {
            const res = archivosCargados.filter((value, index, arr) => {
                /* if (arr[index]) */
            });
            archivosCargados = [...res]
            if (res.length > 0) mostrarArchivosCargados();
            else mainBox.innerHTML = firstBox, mainBox.classList.remove('file-dragged-in_1_with-files');
        });
    });
}

//TODO: Implementar refuncionamiento del input de la zona de dropeo al eliminar todos los archivos del array principal
//TODO: Documentar nuevas cosas implementadas
//TODO: Solo hacer que se borre un repetido del array principal
