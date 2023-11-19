export function secondBox(cards) {
    const border_box = document.createElement('div');
    border_box.className = 'box_border'
    border_box.classList.add('two');
    const filesContainer = document.createElement('div');
    filesContainer.classList = 'files-container';
    cards.forEach(element => {
        filesContainer.appendChild(element);
    });
    border_box.appendChild(filesContainer)
    return border_box;
}
