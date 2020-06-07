//jshint esversion: 6
// Copyright 2020 Isaac Svi

let baseSize = Number(getComputedStyle(document.body).getPropertyValue('--GS__base-size').replace('rem',''));
baseSize = Math.round(convertRemToPixels(baseSize));
let slider = document.querySelector('.GS__slider');
let cards = document.querySelectorAll('.GS__card');
let containers = document.querySelectorAll('.GS__container');
let bigCard = 1; //represents position of the big card in positions array
let positions = [];

function convertRemToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function roundFontSize() {  
  size = Math.round(baseSize * 0.06);
  size1 = Math.round(baseSize * 0.04);
  size2 = Math.round(baseSize / 30);

  console.log(size, size1, size2);

  document.body.style.setProperty("--GS__info-h3-fs", size + "px");
  document.body.style.setProperty("--GS__info-h3-p-fs", size1 + "px");
  document.body.style.setProperty("--GS__info-h3-btn-fs", size2 + "px");
}

//very important; sets width for slider according to baseSize and number of cards user wants to put in
setPositions();
window.addEventListener('resize', setPositions);

let right = document.querySelector('.GS__right button');
let left = document.querySelector('.GS__left button');
let animationTime = '1s';
let flag = Array(cards.length).fill(0);

//events to move slider
document.addEventListener("keydown", function (e) {
	e = e || window.event;
	let d = e.keyCode == '37' ? "left" : e.keyCode == '39' ? "right" : null;
	shiftSlider(d);
});
right.addEventListener("click", shiftSlider.bind(null,"right"));
left.addEventListener("click", shiftSlider.bind(null,"left"));

for (let i = 0; i < cards.length; i++) {
  for (let j = 0; j < 2; j++) {
    cards[i].querySelectorAll('.GS__flip-btn')[j].addEventListener('click', function () {
      cards[i].style.animation = flag[i] ? 'GS__switch2 1s forwards' : 'GS__switch 1s forwards';
      flag[i] = flag[i] ? --flag[i] : ++flag[i];
    });
  }
}

//auxiliary functions
function setPositions () { //resets positions of gallery object when needed
  const distance = (baseSize / 5 * 2) / baseSize; //basically 0.4, this is because the size of each small container is 1/5 of the big container, and each space between the big container is also 1/5 of each big container
  let distancer = distance;
  baseSize = Number(getComputedStyle(document.body).getPropertyValue('--GS__base-size').replace('rem',''));
  baseSize = Math.round(convertRemToPixels(baseSize));

  for (let i = 0; i < containers.length; i++) {
    positions[i] = baseSize * distancer;
    distancer -= distance;
  }
  slider.style.left = positions[bigCard] + 'px';
  slider.style.width = baseSize + (baseSize / 2.5) * (containers.length - 1) + "px";
  roundFontSize();
}

function shiftSlider (dir) {
  if ((dir === "right" && bigCard < containers.length - 1) || (dir === "left" && bigCard > 0)) {
		const leftOffset = dir === "right" ? bigCard + 1 : bigCard - 1;
    slider.style.left = positions[leftOffset] + 'px';
    
    dir = dir === "right" ? "left" : "right";
    cards[bigCard].style.animation = `GS__smallen-${dir} ${animationTime} forwards`;
    containers[bigCard].classList.remove('GS__active', 'GS__reflect');
    containers[bigCard].style.flex = '0 0 calc(var(--GS__base-size) / 5)';
    
    bigCard = leftOffset;
    cards[bigCard].style.animation = `GS__biggen-${dir} ${animationTime} forwards`;
    containers[bigCard].style.flex = '0 0 var(--GS__base-size)';
    containers[bigCard].classList.add('GS__reflect');
    flag[bigCard] = 0;

    setTimeout(function () {
      containers[bigCard].classList.add('GS__active');
    }, 1000);
  }
}