var navMain = document.querySelector('.navbar');
var navToggle = document.querySelector('.navbar__burger');

navMain.classList.remove('navbar--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('navbar--closed')) {
    navMain.classList.remove('navbar--closed');
    navMain.classList.add('navbar--opened');
  } else {
    navMain.classList.add('navbar--closed');
    navMain.classList.remove('navbar--opened');
  }
});
