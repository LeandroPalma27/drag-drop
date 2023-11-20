export function secondBox(cards) {
    const border_box = document.createElement('div');
    border_box.className = 'box_border'
    const filesContainer = document.createElement('div');
    filesContainer.classList = 'files-container';
    cards.forEach(element => {
        filesContainer.appendChild(element);
    });
    border_box.appendChild(filesContainer)
    return border_box;
}
