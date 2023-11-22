// Componente HTML para el mainBox de zona de dropeo con archivos (card del archivo ya cargado y renderizado)
// Esta funcion recibe el objeto que contiene un identificador unico(para poder manejar ese archivo unicamente por mas que este repetido), y el objeto File en cuestion.
// El objeto de desestructura en "idFile" y "file"
export function cardFile({idFile, file}) {
    // Creamos el elemento para la imagen
    const img = document.createElement('img');
    // Usamos el FileReader para la carga del archivo en la imagen HTML
    const reader = new FileReader();
    reader.readAsDataURL(file)
    // Cuando cargue, ejecutara la siguiente funcion
    reader.onloadend = () => {
        // Y definimos la propiedad source para cargar lo resultante de la funcion "onload"
        img.src = reader.result;
        // Y el titulo de la img sera la propiedad name del objeto File
        img.title = file.name;
    }
    // El cardFile constara de:
    // Un div que servira como contenedor general (contendra el div con la informacion de la imagen y un boton que tendra position absolute para eliminar el archivo)
    const fileCard = document.createElement('div');
    fileCard.className = 'file'
    // El file box contendra el archivo cargado, y tambien el nombre del archivo
    const fileBox = document.createElement('div');
    fileBox.className = 'file_box';
    const file_1 = document.createElement('div');
    file_1.className = 'file_1'
    // Se carga el nodo IMG al file_1
    file_1.appendChild(img);
    // File 2 contendra el nombre de la imagen
    const file_2 = document.createElement('div');
    file_2.className = 'file_2'
    // Creamos el span para cargar el nombre del archivo
    const titleImg = document.createElement('span');
    // Agreammos el texto al span previamente creado
    titleImg.appendChild(document.createTextNode(file.name));
    // Ahora agregamos el nombre de la imagen a file 2
    file_2.appendChild(titleImg);
    // Luego, con el file 1 ya con la imagen cargada y el file 2 con el nombre del archivo, se procede a agregarlos al file box
    fileBox.appendChild(file_1);
    fileBox.appendChild(file_2);

    // Creamos el boton que se encarga de eliminar el archivo del array principal
    const button = document.createElement('button');
    button.className = 'file-closer'
    // Creamos el icon para el boton
    const i = document.createElement('i');
    // le asignamos esta clase, que es la que carga el icono de X de fontAwesome
    i.classList = 'fa-solid fa-xmark'
    // Asigamos el icono al boton
    button.appendChild(i)
    // El boton ahora tendra de propiedad name el id del archivo
    button.name = idFile;
    // Asignamos la clase correspondiente para el boton de eliminar archivos
    button.classList.add('delete-button')
    // Y por ultimo, al contenedor general del cardFile se le asignara el fileBox y el boton
    fileCard.appendChild(fileBox)
    fileCard.appendChild(button)
    return fileCard;
}