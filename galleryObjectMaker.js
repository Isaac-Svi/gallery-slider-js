//jshint esversion: 6
//Copyright 2020 Isaac Svi
class GalleryObject {
  constructor(type,element,json) {
    this.pictureSets = json.src;
    this.bg = json.backgroundColor;
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
    return property === null || property === undefined || !property || property === "";
  }

  setFontFamily(areas) {
    this.node.querySelectorAll(areas).forEach(child => child.style.fontFamily = this.font);
  }

  setReflection() {
    if (this.reflect || this.reflect == undefined) {
      const reflection = "below calc(var(--GS__base-size) / -5.1020408163) linear-gradient(transparent 60%, rgba(255,255,255,0.5));";
      document.body.style.setProperty('--GS__reflection', reflection);
    }
    else {
      document.body.style.setProperty('--GS__reflection', 0);
    }
  }

  setBackground() {
    if (!this.isNullProperty(this.bg)) {
      document.body.style.setProperty('--GS__clr-bg', this.bg);
    }
    else {
      document.body.style.setProperty('--GS__clr-bg', "none");
    }
  }

  createGalleryGrid(element) {
    this.node.classList.add("GS__grid");
    
    document.body.style.setProperty('--GS__grid-size', this.baseSize + "px");

    element.appendChild(this.node);

    this.info = this.isNullProperty(this.info) ? [] : this.info;
    
    for (let i in this.pictureSets) {
      this.node.innerHTML += this.createGridContainer(this.pictureSets[i], this.info[i]);
    }

    this.setFontFamily(".GS__grid-info, .GS__gallery-info-buttons button");
  }

  createGridContainer(pictures,info) {
    info = this.isNullProperty(info) ? [] : info;
    let container = `
      <div class="GS__grid-container">
        <div class="GS__grid-card ${this.dir}">
          <div class="GS__front">
            <img src='${pictures[0]}' alt="">
            ${this.createGridCardInfo(info[0])}
          </div>
          <div class="GS__back">
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
      <div class="GS__grid-info">
        <h3>${info.header}</h3>
        <p>${info.text}</p>
      </div>
    `;
  }

  createGallerySlider(element) {
    this.node.classList.add("GS__frame");
    this.slider = document.createElement("div");
    this.slider.classList.add("GS__slider");

    element.appendChild(this.node);
    this.node.appendChild(this.slider);

    for (let i = 0; i < this.pictureSets.length; i++) {
      this.createAndAppendSliderContainers(i);
    }
    this.node.innerHTML += `
      <div class='GS__left'><button><span></span></button></div>
      <div class='GS__right'><button><span></span></button></div>
    `;
    this.setFontFamily(".GS__info, .GS__gallery-info-buttons button");
    this.setReflection(this.reflect);
    this.setBackground(this.bg);
  }

  createAndAppendSliderContainers(num) {
    let container = document.createElement("div");
    let classList = num === 1 ? ["GS__container", "GS__active", "GS__reflect"] : ["GS__container"];
    container.classList.add(...classList);
    container.innerHTML += this.createCard(this.pictureSets[num], this.info[num]);
    this.slider.appendChild(container);
  }

  createCard(picSet, info) {
    info = this.isNullProperty(info) ? [] : info;
    return `
      <div class='GS__card'>
        <div class='GS__front'>
          <img src='${picSet[0]}' alt=''/>
          ${this.createCardInfo(info[0])}
        </div>
        <div class='GS__back'>
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
      <div class="GS__info">
        <h3>${info.header}</h3>
        <p>${info.text}</p>
        <div class="GS__gallery-info-buttons">
          <button class="GS__flip-btn">Flip</button>
        </div>
      </div>
    `;
  }
}

