# Documentation for gallery-slider.js

Hey there!

Gallery-slider.js is a library that I created with the purpose of making it easier for anyone to easily add a good-looking gallery into their site.  It's still a work-in-progress, so any feedback/constructive criticism would be appreciated!

With that being said, here are some instructions as to how this mini library is intended to be used.

---

## Add the following style links to your header:

* The first link is to a CDN for Font Awesome.  This is needed for the arrow icons that will allow us to navigate through the gallery.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
```

* The second link is the stylesheet for the gallery.
```html
<link rel="stylesheet" href="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/7f68081c3502be4f02ecd2308d7ed4e6c146f9c1/styles.css">
```


## Go to the body, and add the following element:

```html
<div id="gallerySlider"></div>
```

This is div is where the gallery will be inserted.


## Add the following script tags to the bottom of the body **in the order they're shown**:

* The first tag gives us access to the gallery object where we can enter all of the data we want to show in the gallery.
```html
<script src="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/7f68081c3502be4f02ecd2308d7ed4e6c146f9c1/galleryObjectMaker.js"></script>
```

* Create the gallery object like so in the 2nd tag. More about the JSON that needs to be passed into the object in the next section.
```html
<script>
	let g = new GalleryObject(jsonData);
	let elem = document.getElementById("gallerySlider");
	g.createGallerySlider(elem);
</script>
```

* Last tag provides animation to the gallery's components
```html
<script src="https://rawcdn.githack.com/Isaac-Svi/gallery-slider-js/ac207029fd07a4285f618e4cccb401fff3aae007/script.js"></script>
```

## How to write the JSON data:

As of the current version of this library, the JSON object which will be passed as the only parameter of the GalleryObject has the following structure:

* **font** : 
		Place your font here like you would for any element in CSS. If left empty, gallery will use whatever default font your project is using.

* **reflection** : 
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

















