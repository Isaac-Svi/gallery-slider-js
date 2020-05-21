//jshint esversion: 6
// Copyright 2020 Isaac Svi

let baseSize = Number(getComputedStyle(document.body).getPropertyValue('--base-size').replace('px',''));
let slider = document.querySelector('.slider');
let cards = document.querySelectorAll('.card');
let containers = document.querySelectorAll('.container');
let bigCard = 1; //represents position of the big card in positions array
let positions = [];

//very important; sets width for slider according to baseSize and number of cards user wants to put in
setPositions();
window.addEventListener('resize', setPositions);

let right = document.querySelector('.right button');
let left = document.querySelector('.left button');
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
    cards[i].querySelectorAll('.flip-btn')[j].addEventListener('click', function () {
      cards[i].style.animation = flag[i] ? 'switch2 1s forwards' : 'switch 1s forwards';
      flag[i] = flag[i] ? --flag[i] : ++flag[i];
    });
  }
}

//auxiliary functions
function setPositions () { //resets positions of gallery object when needed
  const distance = (baseSize / 5 * 2) / baseSize; //basically 0.4, this is because the size of each small container is 1/5 of the big container, and each space between the big container is also 1/5 of each big container
  let distancer = distance;
  baseSize = Number(getComputedStyle(document.body).getPropertyValue('--base-size').replace('px',''));
  for (let i = 0; i < containers.length; i++) {
    positions[i] = baseSize * distancer;
    distancer -= distance;
  }
  slider.style.left = positions[bigCard] + 'px';
  slider.style.width = baseSize + (baseSize / 2.5) * (containers.length - 1) + "px";
}

function shiftSlider (dir) {
  if ((dir === "right" && bigCard < containers.length - 1) || (dir === "left" && bigCard > 0)) {
		const leftOffset = dir === "right" ? bigCard + 1 : bigCard - 1;
    slider.style.left = positions[leftOffset] + 'px';
    
    dir = dir === "right" ? "left" : "right";
    cards[bigCard].style.animation = `smallen-${dir} ${animationTime} forwards`;
    containers[bigCard].classList.remove('active', 'reflect');
    containers[bigCard].style.flex = '0 0 calc(var(--base-size) / 5)';
    
    bigCard = leftOffset;
    cards[bigCard].style.animation = `biggen-${dir} ${animationTime} forwards`;
    containers[bigCard].style.flex = '0 0 var(--base-size)';
    containers[bigCard].classList.add('reflect');
    flag[bigCard] = 0;

    setTimeout(function () {
      containers[bigCard].classList.add('active');
    }, 1000);
  }
}