// Componente HTML que va a generar toda la lista de archivos ya cargados en el DOM
export function secondBox(cards) {
    // Constara de un div que terminara agregado al mainBox, empezando por el div del border
    const border_box = document.createElement('div');
    border_box.className = 'box_border'
    // Luego un contenedor para todos los cardFiles
    const filesContainer = document.createElement('div');
    filesContainer.classList = 'files-container';
    // Unimos todos los cardFiles al contenedor
    cards.forEach(element => {
        filesContainer.appendChild(element);
    });
    // Ahora al border box le agregamos el contenedor de todos los cardFiles
    border_box.appendChild(filesContainer)
    return border_box;
}
