document.getElementById('nav-list')!.addEventListener('click', () => {
  document.getElementById('form-section')!.classList.add('hidden');
  document.getElementById('list-section')!.classList.remove('hidden');
});

document.getElementById('nav-add')!.addEventListener('click', () => {
  document.getElementById('list-section')!.classList.add('hidden');
  document.getElementById('form-section')!.classList.remove('hidden');
});