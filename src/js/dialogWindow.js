export function createCard (createFields) {
  const dialogWrap = document.createElement('div');
  const dialogWindow = document.createElement('div');
  const dialogClose = document.createElement('span');
  dialogWrap.appendChild(dialogWindow);
  dialogWindow.appendChild(dialogClose);

  const dialogSelect = document.createElement('select');
  const dialogSelectOpt = document.createElement('option');
  dialogSelectOpt.innerText = 'Cardiologist';
  dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
  dialogSelectOpt.innerText = 'Dentist';
  dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
  dialogSelectOpt.innerText = 'Therapist';
  dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
  dialogWindow.appendChild(dialogSelect);

  dialogWrap.className = 'dialog';
  dialogWindow.className = 'dialog__window';
  dialogClose.className = 'dialog__close';
  dialogClose.innerHTML = '&#10006';
  dialogSelect.className = 'dialog__doctor';

  dialogSelect.after(createFields());

  dialogWrap.addEventListener('click', event => {
    if (event.target === event.currentTarget || event.target === dialogClose) {
      event.currentTarget.remove();
    }
  });

  return dialogWrap;
}