

function GalleryObject (json) {
	this.pictureSets = json.src;
	this.info = json.pictureInfo;
	this.font = json.font;
		
	this.node = document.createElement("div");
	this.node.classList.add("frame");
	
	this.slider = document.createElement("div");
	this.slider.classList.add("slider");
	
	this.arrows = `
		<div class='left'><button><i class='fas fa-chevron-left'></i></button></div>
		<div class='right'><button><i class='fas fa-chevron-right'></i></button></div>
	`;
}

GalleryObject.prototype.setFontFamily = function () {
	this.node.querySelector("*").style.fontFamily = this.font;
	this.node.querySelector(".buttons button").style.fontFamily = this.font;
};

GalleryObject.prototype.createGallerySlider = function (element) {
	element.appendChild(this.node);
	this.node.appendChild(this.slider);
	
	for (let i = 0; i < this.pictureSets.length; i++) {
		this.createAndAppendContainers(i);
	}
	this.node.innerHTML += this.arrows;
	
	this.setFontFamily('verdana');
}
GalleryObject.prototype.createAndAppendContainers = function (num) {
	let card = "<div class='card'></div>";
	let container = document.createElement("div");
	let classList = num === 1 ? ["container", "active", "reflect"] : ["container"];
	container.classList.add(...classList);
	
	container.innerHTML += this.createCard(this.pictureSets[num], this.info[num]);
	
	this.slider.appendChild(container);
};

GalleryObject.prototype.createCard = function (picSet, info) {
	let side = "front";
	let card = "<div class='card'>";

	for (let i = 0; i < 2; i++) {
		card += `
			<div class='${side}'>
				<img src='${picSet[i]}' alt=''/>
				<div class="info">
					<h3>${info.header}</h3>
					<p>${info.text}</p>
					<div class="buttons">
						<button class="flip-btn">Flip</button>
					</div>
				</div>
			</div>
		`;
		if (side === "back") break;
		side = "back";
	}
	
	card += "</div>";
	
	return card;
};
