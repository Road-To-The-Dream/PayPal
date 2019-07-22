document.querySelector('.close-info').onclick = () => {
    let elemq = document.querySelector('#slides')
    while (elemq.firstChild) {
        elemq.removeChild(elemq.firstChild);
    }
    let toRemoveContent = document.querySelector('.product-info-characteristics')
    while (toRemoveContent.firstChild) {
        toRemoveContent.removeChild(toRemoveContent.firstChild)
    }
    document.querySelector('.product-info-wrapper')
        .style = `display: none; z-index: -1;`
    document.documentElement.style = 'overflow: auto;'
}