import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { cardFile } from './js/components/file';
import { secondBox } from './js/components/second-box';
import { firstBox } from './js/components/first-box';
import { subirArchivos } from './js/provider/functions/uploadFiles';

/* <========== COMPONENTE PARA EL DROPEO Y RECEPECION DE ARCHIVOS EN EL ARRAY PRINCIPAL ==========> */
// Obtenemos la zona de dropeo de elementos (EN ESTE CASO SERA UN ARCHIVO)
const mainBox = document.querySelector('.principal_box');
// Inputfile para seleccionar archivos manualmente
const inputFile = document.querySelector('#fileElem');
// Boton que acciona el inputFile (PARA EVITAR USAR EL TEXTO PREDEFINIDO DEL INPUT FILE)
const btnSelectFile = document.querySelector('#btnSelectFile');
// ARRAY PRINCIPAL: Array que almacenara todos los archivos cargados hasta el momento, para su posterior subida
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
});
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
    // Con this.files estamos ejectuando un "inputFile.files" (PARA OBTENER LOS ARCHIVOS)
    const res = manejarArchivos([...this.files])
    // Convertimos el input a tipo texto
    this.type = "text";
    // Y luego lo regresamos a tipo file, para que este vacie lo que tenga dentro (PARA PODER SUBIR ARCHIVOS REPETIDOS DESDE ESTE INPUT)
    this.type = "file";
    // Y en ese caso, ejecutamos la funcion que cambia la vista del mainBox (CON LOS ARCHIVOS LISTOS PARA SER ENVIADOS)
    if (res) mostrarArchivosCargados();
});


/* <========== COMPONENTE HANDLE PARA LOS ARCHIVOS YA RECEPCIONADOS Y PARA SU PROCESO AL ARRAY PRINCIPAL ==========> */
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
    // Si hay archivos validos, se evaluara esta condicion
    if (allowedFiles.length > 0) {
        // Y en caso de que la cantidad de elementos del array de archivos validos, sumada a cantidad de archivos ya cargados a la lista de archivos listos para subir, sea menor o igual
        // a 6, se van a pushear en su totalidad a este ultimo array.
        if (archivosCargados.length + allowedFiles.length <= 6) {
            allowedFiles.forEach(file => archivosCargados.push(
                {
                    idFile: Date.now(),
                    file
                }));
        } else {
            // Caso contrario, solo se van a pushear la cantidad de elementos restantes, evaluando la diferencia de 6 menos la cantidad de elementos que tenga el array
            // de archivos ya cargados.
            let cont = 6 - archivosCargados.length;
            // Hasta que el contador no sea 0, se seguiran pusheando los archivos al array principal.
            while (cont > 0) {
                archivosCargados.push(
                    {
                        idFile: Date.now(),
                        file: allowedFiles[cont - 1]
                    })
                cont--
            }
            // Y terminamos mostrando un alert que indique lo siguiente (YA QUE HUBO UN EXCESO DE ARCHIVOS)
            alert('Solo se permiten 6 archivos')
        }
        console.log(archivosCargados)
        // Retornamos true ya que se cargaron archivos al array principal
        return true;
    }
    // En caso de cumplirse la condicion de arriba, no necesitamos retornar "false", ya que en JS un null se toma como false.
}


/* <========== COMPONENTE PARA EVITAR LA PROPAGACION Y EL DISPARO MULTIPLE DE EVENTOS EN NUESTRA ZONA DE DROPEO (DEBIDO A SU ARQUITECTURA DE DESARROLLO) ==========> */
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


/* <========== COMPONENTE PARA MOSTRAR LOSA ARCHIVOS CARGADOS EN NUESTRO HTML, REPRESENTADO A TRAVES DE CARDS ==========> */
// Funcion que muestra los archivos cargados en el array principal (ESTOS SON ARCHIVOS VALIDOS Y LISTOS PARA SUBIR)
/*
    * Se ejecuta cada que el array principal de archivos recibe un nuevo elemento (ya sea dropeando elementos validos o seleccionando archivos validos desde el inputFile)
    * Tambien se ejecuta cada que se elimina un archivo del array principal
*/
function mostrarArchivosCargados() {
    // Generamos un array con todos los cardFile por cada archivo existente en el array principal
    const cardRenders = archivosCargados.map(archivo => cardFile(archivo));
    // Ahora generamos el div final con todos esos cardFiles incluidos
    const finalBox = secondBox(cardRenders);
    // Añadimos una clase css al mainBox, para que mantenga el fondo blanco como al arrastrar archivos en esta misma
    mainBox.classList.add('file-dragged-in_1_with-files');
    // Quitamos todo lo que contenga el mainBox
    mainBox.innerHTML = ''
    // Añadimos el nodo que contiene todos los cardFiles
    mainBox.appendChild(finalBox)
    // Boton que se usa para subir los archivos al servicio cloudinary
    const btnUploadFiles = document.querySelector('#btnUploadFiles');
    // Creamos el evento del boton para subir los archivos, y este ejecuta una funcion que sube los archivos con un fetch
    btnUploadFiles.addEventListener('click', function (e) {
        // Llamamos a la funcion que consume nuestra API para subir los archivos cargados en el array principal
        const res = subirArchivos(archivosCargados)
        // Llamamos a la funcion que carga la barra de carga en nuestra vista
        mostrarBarraCarga();
        // En el response obtenido de nuestra promesa, en caso de recibirse con exito y tener una respuesta HTTP 20X
        // LLamara a la funcion "quitarBarraCarga()", que se encarga que ocultar la barra de carga de la vista
        res.then(e => {
            if (e.ok) quitarBarraCarga();
            // Caso contrario, llamara a la funcion que carga una pantalla de error de servidor, al recibir una respueta HTTP 50X
            else cargarErrorServidor();
        });
    });
    // Ahora creamos los eventos para los botones de elminar de todos esos cardFiles
    createDeleteFileEvents(document.querySelectorAll('.delete-button'))
}


/* <========== COMPONENTE PARA LA CREACION DE LOS BOTONES QUE ELIMINAN UNA FOTO DE LA VISTA HTML (Y TAMBIEN DEL ARRAY PRINCPAL) ==========> */
// Function que crea los eventos para cada uno de los botones de eliminar de los cardFiles
/*
    * Recibe un array de todos los botones, obtenidos de un querySelectorAll desde la function de mostrarArchivosCargados()
    * A traves de un forEach, crea eventos para cada uno de los botones
    * El evento click generado se encarga de elminar el archivo del array pricipal, a traves de un filter
    * Luego de filtrar todos los elementos, el resultado se reasigna al array principal (YA NO TIENE EL ELEMENTO ELIMINADO EN CUESTION)
    * luego, si el arrayPrincipal tiene elementos (QUIERE DECIR QUE AUN QUEDAN FOTOS), se vuelve a llamar a la funcion que muestra los archivos cargados,
      actualizando el DOM, y este a su vez creando nuevos botones y por lo tanto nuevos eventos para estos para repetir el proceso.
    * Si el array principal termina vacio, se regresa el mainBox a su estado original.
 */
function createDeleteFileEvents(deleteFileButtons) {
    deleteFileButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const res = archivosCargados.filter((value) => {
                // Retornamos solo los archivos que no coincidan con el id que tiene ese boton de eliminar en cuestion:
                return this.name != value.idFile;
            });
            archivosCargados = [...res]
            console.log(archivosCargados)
            if (res.length > 0) mostrarArchivosCargados();
            // Se limpia con el innerHTML, y luego se agrega el HTMLElement que contiene la dropZone, al final quitamos la clase que cambia el fondo a blanco cuando hay archivos presentes.
            else mainBox.innerHTML = '', mainBox.appendChild(firstBox()), recreateEventsForInputFileAndInputButton(), mainBox.classList.remove('file-dragged-in_1_with-files');
        });
    });
}


/* <========== COMPONENTE PARA LA REACTIVACION DE LOS EVENTOS PARA EL INPUTFILE QUE PROCESA ARCHIVOS DESDE UN BOTON EN LA VISTA HTML ==========> */
// Funcion encargada de REACTIVAR EVENTOS al momento de eliminar todos los archivos de la lista de archivos princpal (al borrar todos los archivos usando el boton de eliminar archivo)
function recreateEventsForInputFileAndInputButton() {
    // Volvemos a capturar el inputFile
    const inputFile = document.querySelector('#fileElem');
    // Y tambien el input encargado de activar el inputFile
    const btnSelectFile = document.querySelector('#btnSelectFile');
    // Volvemos a generar los eventos para dichos elementos capturados previamente
    btnSelectFile?.addEventListener('click', () => inputFile.click());
    inputFile?.addEventListener('change', function () {
        const res = manejarArchivos([...this.files])
        this.type = "text";
        this.type = "file";
        if (res) mostrarArchivosCargados();
    });
}


/* <========== FUNCIONES PARA MOSTRAR Y QUITAR LA BARRA DE CARGA ==========> */
// Mostrando barra de carga, al darle click a subir archivos
function mostrarBarraCarga() {
    console.log('cargando...')
    // Al main box le asigamos la clase CSS "cargando", que hace que tenga la propiedad BLUR
    document.body.firstElementChild.classList.add("cargando");
    // Al siguiente elemento del mainbox, le cambiamos el estado hidden a false, para que se muestre en el DOM
    document.body.firstElementChild.nextElementSibling.hidden = false;
    // Y a ese elemento, le cargamos la clase CSS "activo", que carga la propiedad opacity en 1
    document.body.firstElementChild.nextElementSibling.classList.add("activo");
}

function quitarBarraCarga() {
    console.log('cargo con exito!')
    // Quitando la barra de carga, llamamos a esta funcion
    // Que a la barra de carga, le cambia el texto a un "cargo con exito! (YA QUE SE RECIBIO UN HTTP RESPONSE 20X)"
    document.body.firstElementChild.nextElementSibling.textContent = 'CARGO CON EXITO!'
    // REINICIAMOS EL ARRAY PRINCIPAL DE ARCHIVOS
    archivosCargados = [];
    // Y AL MAIN BOX, LO DEJAMOS COMO AL INICIO, CON LA ZONA DE DROPEO INTACTA
    mainBox.innerHTML = '', mainBox.appendChild(firstBox()), recreateEventsForInputFileAndInputButton(), mainBox.classList.remove('file-dragged-in_1_with-files');
    // Ejecutamos un timeout que luego de 500ms, establezca a la barra de carga con un hidden, le regrese el texto a "Cargando..." y le quite las clases CSS "activo y cargando"
    setTimeout(() => {
        document.body.firstElementChild.nextElementSibling.hidden = true;
        document.body.firstElementChild.nextElementSibling.textContent = 'Cargando...'
        document.body.firstElementChild.nextElementSibling.classList.remove("activo");
        document.body.firstElementChild.classList.remove("cargando");
    }, 500);
}

function cargarErrorServidor() {}

// TODO: MEJORAR BARRA DE CARGA, TAMBIEN DOCUMENTAR Y HACER TODOS PENDIENTES EN EL BACKEND

