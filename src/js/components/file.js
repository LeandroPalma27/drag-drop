// Componente HTML para el mainBox de zona de dropeo con archivos (card del archivo ya cargado y renderizado)
export function cardFile({idFile, file}) {
    const img = document.createElement('img');
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        img.src = reader.result;
        img.title = file.name;
    }
    const fileCard = document.createElement('div');
    fileCard.className = 'file'
    const fileBox = document.createElement('div');
    fileBox.className = 'file_box';
    const file_1 = document.createElement('div');
    file_1.className = 'file_1'
    file_1.appendChild(img);
    const file_2 = document.createElement('div');
    file_2.className = 'file_2'
    const titleImg = document.createElement('span');
    titleImg.appendChild(document.createTextNode(file.name));
    file_2.appendChild(titleImg);
    fileBox.appendChild(file_1);
    fileBox.appendChild(file_2);
    const button = document.createElement('button');
    button.className = 'file-closer'
    const i = document.createElement('i');
    i.classList = 'fa-solid fa-xmark'
    button.appendChild(i)
    button.name = idFile;
    button.classList.add('delete-button')
    fileCard.appendChild(fileBox)
    fileCard.appendChild(button)
    return fileCard;
}