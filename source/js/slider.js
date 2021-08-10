const linksArray = [
  greeceLink = document.querySelector('.details__link--greece'),
  albaniaLink = document.querySelector('.details__link--albania'),
  macedoniaLink = document.querySelector('.details__link--macedonia'),
  montenegroLink = document.querySelector('.details__link--montenegro'),
  croatiaLink = document.querySelector('.details__link--croatia')
];
const greeceImage = document.querySelector('.countries__link--greece');
const albaniaImage = document.querySelector('.countries__link--albania');
const macedoniaImage = document.querySelector('.countries__link--macedonia');
const montenegroImage = document.querySelector('.countries__link--montenegro');
const croatiaImage = document.querySelector('.countries__link--croatia');

const greece = '.details__greece';
const albania = '.details__albania';
const macedonia = '.details__macedonia';
const montenegro = '.details__montenegro';
const croatia = '.details__croatia';

const slidesArray = [greece, albania, macedonia, montenegro, croatia];

const showSliderElement = (show, linkAdd) => {
  linksArray.forEach((link) => {
    if (link === linkAdd) {
      link.classList.add('details__link--current');
    }
    else {
      link.classList.remove('details__link--current');
    }
  })

  slidesArray.forEach((slide) => {
    if (slide === show) {
      document.querySelector(`${slide}`).classList.add('details__show');
    } else {
      document.querySelector(`${slide}`).classList.remove('details__show');
    }
  })
};

greeceLink.addEventListener('click', () => {
  showSliderElement(greece, greeceLink);
});

albaniaLink.addEventListener('click', () => {
  showSliderElement(albania, albaniaLink);
});

macedoniaLink.addEventListener('click', () => {
  showSliderElement(macedonia, macedoniaLink);
});

montenegroLink.addEventListener('click', () => {
  showSliderElement(montenegro, montenegroLink);
});

croatiaLink.addEventListener('click', () => {
  showSliderElement(croatia, croatiaLink);
});

greeceImage.addEventListener('click', () => {
  showSliderElement(greece, greeceLink);
});

albaniaImage.addEventListener('click', () => {
  showSliderElement(albania, albaniaLink);
});

macedoniaImage.addEventListener('click', () => {
  showSliderElement(macedonia, macedoniaLink);
});

montenegroImage.addEventListener('click', () => {
  showSliderElement(montenegro, montenegroLink);
});

croatiaImage.addEventListener('click', () => {
  showSliderElement(croatia, croatiaLink);
});
