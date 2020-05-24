//jshint esversion: 6
//Copyright 2020 Isaac Svi
class GalleryObject {
  constructor(type,element,json) {
    this.pictureSets = json.src;
    this.info = json.pictureInfo;
    this.dir = this.isNullProperty(json.flipDirection) ? "x" : json.flipDirection;
    this.font = json.font;
    this.baseSize = json.baseSize ? json.baseSize : 250;
    this.reflect = json.reflection;
    this.node = document.createElement("div");

    switch (type) {
      case "slider" : 
        this.createGallerySlider(element);
        break;
      case "grid" : 
        this.createGalleryGrid(element);
        break;
      default:
        console.log("ERROR: You need to enter in a valid type.");
    }
  }

  isNullProperty(property) {
    return property === null || property === undefined || !property;
  }

  setFontFamily(areas) {
    this.node.querySelectorAll(areas).forEach(child => child.style.fontFamily = this.font);
  }

  setReflection() {
    if (this.reflect || this.reflect == undefined) {
      const reflection = "below calc(var(--base-size) / -5.1020408163) linear-gradient(transparent 60%, rgba(255,255,255,0.5));";
      document.body.style.setProperty('--reflection', reflection);
    }
    else {
      document.body.style.setProperty('--reflection', 0);
    }
  }

  createGalleryGrid(element) {
    this.node.classList.add("grid");
    
    document.body.style.setProperty('--grid-size', this.baseSize + "px");

    element.appendChild(this.node);

    this.info = this.isNullProperty(this.info) ? [] : this.info;
    
    for (let i in this.pictureSets) {
      this.node.innerHTML += this.createGridContainer(this.pictureSets[i], this.info[i]);
    }

    this.setFontFamily(".grid-info, .gallery-info-buttons button");
  }

  createGridContainer(pictures,info) {
    info = this.isNullProperty(info) ? [] : info;
    let container = `
      <div class="grid-container">
        <div class="grid-card ${this.dir}">
          <div class="front">
            <img src='${pictures[0]}' alt="">
            ${this.createGridCardInfo(info[0])}
          </div>
          <div class="back">
            <img src='${pictures[1]}' alt="">
            ${this.createGridCardInfo(info[1])}
          </div>
        </div>
      </div>
    `;
    
    return container;
  }

  createGridCardInfo(info) {
    if (this.isNullProperty(info)) return null;
      
    return `
      <div class="grid-info">
        <h3>${info.header}</h3>
        <p>${info.text}</p>
      </div>
    `;
  }

  createGallerySlider(element) {
    this.node.classList.add("frame");
    this.slider = document.createElement("div");
    this.slider.classList.add("slider");

    element.appendChild(this.node);
    this.node.appendChild(this.slider);

    for (let i = 0; i < this.pictureSets.length; i++) {
      this.createAndAppendSliderContainers(i);
    }
    this.node.innerHTML += `
      <div class='left'><button><span></span></button></div>
      <div class='right'><button><span></span></button></div>
    `;
    this.setFontFamily(".info, .gallery-info-buttons button");
    this.setReflection(this.reflect);
  }

  createAndAppendSliderContainers(num) {
    let container = document.createElement("div");
    let classList = num === 1 ? ["container", "active", "reflect"] : ["container"];
    container.classList.add(...classList);
    container.innerHTML += this.createCard(this.pictureSets[num], this.info[num]);
    this.slider.appendChild(container);
  }

  createCard(picSet, info) {
    info = this.isNullProperty(info) ? [] : info;
    return `
      <div class='card'>
        <div class='front'>
          <img src='${picSet[0]}' alt=''/>
          ${this.createCardInfo(info[0])}
        </div>
        <div class='back'>
          <img src='${picSet[1]}' alt=''/>
          ${this.createCardInfo(info[1])}
        </div>
      </div>
    `;
  }

  createCardInfo(info) {
    if (this.isNullProperty(info)) info = {
      'header' : "",
      'text' : ""
    };
      
    return `
      <div class="info">
        <h3>${info.header}</h3>
        <p>${info.text}</p>
        <div class="gallery-info-buttons">
          <button class="flip-btn">Flip</button>
        </div>
      </div>
    `;
  }
}

