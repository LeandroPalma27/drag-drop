// Componente HTML para el mainBox de zona de dropeo sin ningun archivo
export function firstBox() {
    const border_box = document.createElement('div');
    border_box.className = 'box_border'
    const dragZoneContainer = document.createElement('div');
    dragZoneContainer.className = 'box'
    const box_1 = document.createElement('aside')
    const box_2 = document.createElement('section')
    box_1.className = 'box_1'
    box_2.className = 'box_2'
    const i = document.createElement('i');
    i.classList = 'fa-solid fa-cloud-arrow-down'
    box_1.appendChild(i);
    const span = document.createElement('span')
    span.textContent = 'Arrastra y suelta un archivo JPG o JPGE (max 5mb.) o'
    const inputFile = document.createElement('input');
    inputFile.type = 'file'
    inputFile.id = 'fileElem'
    inputFile.multiple = true
    inputFile.hidden = true
    inputFile.accept = "image/*"
    const inputButtonToActiveInputFile = document.createElement('input')
    inputButtonToActiveInputFile.id = 'btnSelectFile'
    inputButtonToActiveInputFile.className = 'select-file_button'
    inputButtonToActiveInputFile.type = 'button'
    inputButtonToActiveInputFile.value = 'Seleccionalo'

    box_2.appendChild(span)
    box_2.appendChild(inputFile)
    box_2.appendChild(inputButtonToActiveInputFile)

    dragZoneContainer.appendChild(box_1)
    dragZoneContainer.appendChild(box_2)

    border_box.appendChild(dragZoneContainer)

    return border_box;
}