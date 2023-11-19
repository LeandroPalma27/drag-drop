export function secondBox(cards) {
    const filesContainer = document.createElement('div');
    filesContainer.classList = 'files-container';
    cards.forEach(element => {
        filesContainer.appendChild(element);
    });
    return filesContainer;
}
