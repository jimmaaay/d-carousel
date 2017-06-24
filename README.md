# j-carousel

This is a carousel plugin based off of the `g-carousel` that is shown in google search results. 

![g-carousel example](https://github.com/jimmaaay/j-carousel/blob/master/img/g-carousel-example.jpg "g-carousel example")

## Demo 
<Link>

## Setup

### Quick Setup
1. Add the stylesheet and javascript onto your page
```html
<link rel="stylesheet" type="text/css" href="dist/css/main.css"/>
<script src="dist/js/main.min.js" defer ></script>
```
2. Add the required HTML for the carousel
```html
<div class="j-carousel">
  <div class="j-carousel__outer">
    <div class="j-carousel__inner">
      <div>
        <ul class="j-carousel__ul">
          <li class="j-carousel__item">
            ${ITEM}
          </li>
          <li class="j-carousel__item">
            ${ITEM}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```
3. Add the following javascript
```javascript
  jCarousel(document.querySelector('.j-carousel'));
```
4. Done

### Build Tools
The `jCarousel` script can also be used with build tools by doing the following
```javascript
import jCarousel from 'dist/js/main.min.js';
```

## Options
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| paddingLeft | boolean | false | If there is any padding set on `.j-carousel__outer` then this needs to be set to true |
| outerSelector | string | `.j-carousel__outer` | The selector used for the outer element |