// Componente HTML para el mainBox de zona de dropeo sin ningun archivo
export function firstBox() {
    // Creamos el div que usaremos para el borde
    const border_box = document.createElement('div');
    // Asignamos el nombre de clase del div "box_border" para que se cargue con las propiedades css establecidas para esa clase
    border_box.className = 'box_border'
    // Creamos el contenedor que sera la zona de arrastre para archivos y contenedor del inputFile
    const dragZoneContainer = document.createElement('div');
    // Asignamos el nombre de clase "box", para que se cargue con las propiedades css establecidas para esa clase
    dragZoneContainer.className = 'box'
    // Creamos box 1 y box, que semanticamente seran los dos minicomponentes de la dropZone(PARA EL ICON Y EL BOTON)
    const box_1 = document.createElement('aside')
    const box_2 = document.createElement('section')
    // Asignamos los siguientes nombres de clase
    box_1.className = 'box_1'
    box_2.className = 'box_2'
    // Creamos el elemento que cargara el icono importado de fontAwesome
    const i = document.createElement('i');
    // Asignamos esta clase, que es la del icono de archivo en la nube
    i.classList = 'fa-solid fa-cloud-arrow-down'
    // Añadimos este nodo al box 1
    box_1.appendChild(i);
    // Creamos el nodo que contendra la informacion textual de lo que puede hacer el aplicativo
    const span = document.createElement('span')
    span.textContent = 'Arrastra y suelta un archivo JPG o JPGE (max 5mb.) o'
    // Creamos el input que sera para cargar el archivo de forma manual, a traves de un boton
    const inputFile = document.createElement('input');
    // Definimos las siguientes propiedades para ese input
    inputFile.type = 'file'
    inputFile.id = 'fileElem'
    inputFile.multiple = true
    inputFile.hidden = true
    inputFile.accept = "image/*"
    // Creamos el input para activar el inputFile, sin la necesidad de usar este ya que de forma predeterminada y sin poder modificar, se carga con un texto al costado
    const inputButtonToActiveInputFile = document.createElement('input')
    // Definimos las siguientes propiedades para este input que funcionara como activador del inputFile
    inputButtonToActiveInputFile.id = 'btnSelectFile'
    inputButtonToActiveInputFile.className = 'select-file_button'
    inputButtonToActiveInputFile.type = 'button'
    inputButtonToActiveInputFile.value = 'Seleccionalo'

    // Añadimos los nodos del span y los inputs al box 2
    box_2.appendChild(span)
    box_2.appendChild(inputFile)
    box_2.appendChild(inputButtonToActiveInputFile)

    // Añadimos box 1 y box 2 a la dropZone
    dragZoneContainer.appendChild(box_1)
    dragZoneContainer.appendChild(box_2)

    // Añadimos la dropZone al div que usamos para el border
    border_box.appendChild(dragZoneContainer)

    return border_box;
}