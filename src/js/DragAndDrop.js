let dragged;
let shiftX;
let shiftY;

function getCoords(elem) {
    const coords = elem.getBoundingClientRect();
    return {
        top: coords.top + pageYOffset,
        left: coords.left + pageXOffset
    };
}

export function dragStart() {
    if (event.target.classList.contains('card')) {
        dragged = event.target;
        dragged.style.position = 'absolute';
        shiftX = event.pageX - getCoords(dragged).left;
        shiftY = event.pageY - getCoords(dragged).top;
    }
}

export function dragOver() {
    event.preventDefault();
}

export function dragDrop() {
    const board = document.getElementById('board');
    dragged.style.left = event.pageX - board.offsetLeft - shiftX + 'px';
    dragged.style.top = event.pageY - board.offsetTop - shiftY + 'px';
}