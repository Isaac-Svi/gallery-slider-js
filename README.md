# Documentation for gallery-slider.js

Hey there!

Gallery-slider.js is a library that I created with the purpose of making it easier for anyone to easily add a good-looking gallery into their site.  It's still a work-in-progress, so any feedback/constructive criticism would be appreciated!

With that being said, here are some instructions as to how this mini library is intended to be used.

---

## Add the following style links to your header:

* This link is the stylesheet for the slider gallery.
```html
<link rel="stylesheet" href="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/5b6222effc93131be0c0de5389ba87e944a53ab8/css/slider-styles.css">
```
* This link is the stylesheet for the grid gallery.
```html
<link rel="stylesheet" href="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/5b6222effc93131be0c0de5389ba87e944a53ab8/css/grid-styles.css">
```


## Go to the body, and add any of the following elements:

* For a slider:
```html
<div class="GS__gallery-slider"></div>
```
OR

* For a grid:
```html
<div class="GS__gallery-grid"></div>
```

These divs are where the gallery will be inserted.


## Add the following script tags to the bottom of the body in the order they're shown:

* The first tag gives us access to the gallery object where we can enter all of the data we want to show in the gallery.
```html
<script src="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/4482aaec88bab4f76911733e142c5c1f8f30ac11/galleryObjectMaker.js"></script>
```

* Create the gallery object like so in the 2nd tag. 

  * The first parameter in the GalleryObject is the "type" of gallery desired.  So far we have 2 options: "grid" or "slider".
  * The second parameter is the element in which we're placing the gallery.
  * Last is our JSON data, which will be explained in the next section.

The following is an example of how to initialize a "grid gallery".
```html
<script>
  const elem = document.querySelector(".gallery-grid");
  new GalleryObject("grid", elem, data);
</script>
```

  The following is an example of how to initialize a "slider gallery".
```html
<script>
  const elem = document.querySelector(".gallery-slider");
  new GalleryObject("slider", elem, data);
</script>
```

  I would just like to add that you can add the JSON however you like.  Here's an example of how to read and add the JSON asynchronously:

```html
<script>
  fetch('data2.json')
  .then(response => response.json())
  .then(data => {
    const elem = document.querySelector(".gallery-grid");
    new GalleryObject("grid", elem, data);
    const elem2 = document.querySelector(".gallery-slider");
    new GalleryObject("slider", elem2, data);
  })
  .then(() => {
    const src = "script.js";
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  });
</script>
```


* Last tag provides animation to the gallery's components.  Of course, if you followed the asynchronous method above to add this script, you don't have to add the following a second time.
```html
<script src="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/4482aaec88bab4f76911733e142c5c1f8f30ac11/script.js"></script>
```

## How to write the JSON data:

As of the current version of this library, the JSON object which will be passed as the only parameter of the GalleryObject has the following structure:

* **font** : 
		Place your font here like you would for any element in CSS. If left empty, gallery will use whatever default font your project is using.

* **baseSize** : 
		For a grid gallery, this means the minimum width and height of our grid items.
    For a slider gallery, this means the width of our active item.  This is the item currently being presented in our slider.

* **flipDirection** : 
    Only for grid gallery.
		Two possible values of "x" and "y".  x will make our grid items flip along a horizontal axis. y will flip them along a vertical axis.  If no value is given, default will be "x".

* **reflection** : 
    Only for slider gallery.
		Takes a value of ```true``` or ```false```.  If true, will add reflection to image currently shown. If omitted, default will be true.

* **src** : 
		Takes a 2d array, which can be filled up with links to all the images to be displayed, as follows:
		
```javascript
"src" : [
	["<url for image for front image of card 1>", "<url used for back image of card 1>"],
	["<url for image for front image of card 2>", "<url used for back image of card 2>"]
],
```
In this example, we've made 2 cards with 2 sides each.  If a sub-index is left empty, a message of "Image Unavailable" will be shown.
		
* **pictureInfo** :
		This last key in our JSON object should hold a 2d array.  It will hold the text that will be displayed on each side of each card, each index and sub-index matching ```src``` respectively, like so:
		
```javascript
"pictureInfo" : [
	[
		{
			"header" : "Header 1.1",
			"text" : "Text 1.1"
		},
		{
			"header" : "Header 1.2",
			"text" : "Text 1.2"
		}
	],
	[
		{
			"header" : "Header 2.1",
			"text" : "Text 2.1"
		},
		{
			"header" : "Header 2.2",
			"text" : "Text 2.2"
		}
	]
],
```
This was the last step!  With this, we should have 2 cards with different pictures and descriptions on each side.

You can add this JSON directly into the parentheses when you initialize the GalleryObject, or you can store your JSON in a separate file.
		
---

I hope this can help out whoever uses this. Take care, and be well! 👋

















