# j-carousel

This is a carousel plugin based off of the `g-carousel` that is shown in google search results. 

![g-carousel example](https://github.com/jimmaaay/j-carousel/blob/master/img/g-carousel-example.jpg "g-carousel example")

The carousel will work fine without the javascript if you do not need the buttons

## Demo 
WIP

## Setup

### Quick Setup
1. Add the stylesheet and javascript onto your page
```html
<link rel="stylesheet" type="text/css" href="dist/css/main.css"/>
<script src="dist/js/main.min.js"></script>
```
2. Add the required HTML for the carousel and replace  `${ITEM}` with whatever you want to populate the carousel with. **Note each `<li>` is a different item and each item MUST have the same width**
```html
<div class="j-carousel">
  <div class="j-carousel__outer">
    <div class="j-carousel__inner">
      <div>
        <ul class="j-carousel__ul">
          <li class="j-carousel__item">${ITEM}</li>
          <li class="j-carousel__item">${ITEM}</li>
          <li class="j-carousel__item">${ITEM}</li>
        </ul>
      </div>
    </div>
  </div>
  <button class="j-carousel__prev">
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  </button>
  <button class="j-carousel__next">
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  </button>
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
| paddingLeft | Boolean | false | If there is any padding set on `.j-carousel__outer` then this needs to be set to true |
| outerSelector | String | `.j-carousel__outer` | The selector used for the outer element |
| innerSelector | String | `.j-carousel__inner` | The selector used for the inner element |
| itemsSelector | String | `.j-carousel__item` | The selector used for the item elements |
| nextSelector | String | `.j-carousel__next` | The selector used for the next button element |
| prevSelector | String | `.j-carousel__prev` | The selector used for the prev button element |
| easing | Array | `[0.42,0,0.58,1]` | The easing used when scrolling from the next or prev element click. See [this](https://www.w3.org/TR/css3-transitions/#transition-timing-function-property) for common easings values. Default is `ease-in-out`|
| delta | Function, returns Number | `() => 8` | Returns the number of pixels an item can be offscreen and still count as within view |
| duration | Function, returns Number | `() => 500` | Returns the number of milliseconds that the scroll animation should take when next or prev element has been clicked. See usage below |

### Usage
All arguments are accessible from the first parameter which is an object

#### `duration` option

| Arg Name | Description |
| -------- | ----------- |
| itemWidth | The current width of the items elements |
| containerWidth | The current width of the carousel element |
| diff | The number of pixels that will be scrolled |


## Methods
Methods are accessible from the returned object of the `jCarousel` function.

| Methods Name | Description |
| ------------ | ----------- |
| getItemsShowing | Returns the indexes of elements that are showing, in an array |
| forceRefresh | Will force refresh the carousel, so all calculations will be remade. This is called on window resize event anyway |

## Events
Arguments are available from `event.detail` in the callback;

| Event Name | Args | Description |
| ---------- | ---- | ----------- |
| `jCarousel:scroll` | `scrollLeft` - The `scrollLeft` value of the outer element | This event is fired after the carousel has been scrolled and any nessecary calculations have taken place. |

