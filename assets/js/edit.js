var editBtns = document.getElementsByClassName('editBtn');

for (const btn of editBtns) {
  btn.addEventListener('click', () => {
    btn.innerHTML.trim() === 'Edit'
      ? (btn.innerHTML = 'Close')
      : (btn.innerHTML = 'Edit');
  });
}
