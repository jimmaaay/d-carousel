# d-carousel

This is a carousel plugin based off of the `g-carousel` that is shown in google search results. I think this gives a better user experience when used on touch devices over more conventional carousels. Try the demo on your mobile/tablet and swipe to see what I mean.

![g-carousel example](https://github.com/jimmaaay/d-carousel/blob/master/img/g-carousel-example.jpg "g-carousel example")

The carousel will work fine without the javascript if you do not need the buttons

[Demo](https://www.jimmythompson.me/d-carousel/)


## Setup

### Quick Setup
1. Add the stylesheet and javascript onto your page
```html
<link rel="stylesheet" type="text/css" href="dist/css/d-carousel.css"/>
<script src="dist/js/d-carousel.min.js"></script>
```
2. Add the required HTML for the carousel and replace  `${ITEM}` with whatever you want to populate the carousel with. **Note each `<li>` is a different item and each item MUST have the same width**
```html
<div class="d-carousel">
  <div class="d-carousel__outer">
    <div class="d-carousel__inner">
      <div>
        <ul class="d-carousel__ul">
          <li class="d-carousel__item">${ITEM}</li>
          <li class="d-carousel__item">${ITEM}</li>
          <li class="d-carousel__item">${ITEM}</li>
        </ul>
      </div>
    </div>
  </div>
  <button class="d-carousel__prev">
    <svg focusable="false" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  </button>
  <button class="d-carousel__next">
    <svg focusable="false" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  </button>
</div>
```
3. Add the following javascript
```javascript
  dCarousel(document.querySelector('.d-carousel'));
```
4. Done

### Build Tools
The `dCarousel` script can also be used with build tools by doing the following
```javascript
import dCarousel from 'dist/js/d-carousel.min.js';
```

## Options
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| paddingLeft | Boolean | false | If there is any padding set on `.d-carousel__outer` then this needs to be set to true |
| outerSelector | String | `.d-carousel__outer` | The selector used for the outer element |
| innerSelector | String | `.d-carousel__inner` | The selector used for the inner element |
| itemsSelector | String | `.d-carousel__item` | The selector used for the item elements |
| nextSelector | String | `.d-carousel__next` | The selector used for the next button element |
| prevSelector | String | `.d-carousel__prev` | The selector used for the prev button element |
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
Methods are accessible from the returned object of the `dCarousel` function.

| Methods Name | Description |
| ------------ | ----------- |
| getItemsShowing | Returns the indexes of elements that are showing, in an array |
| forceRefresh | Will force refresh the carousel, so all calculations will be remade. This is called on window resize event anyway |

## Events
Arguments are available from `event.detail` in the callback;

| Event Name | Args | Description |
| ---------- | ---- | ----------- |
| `dCarousel:scroll` | `scrollLeft` - The `scrollLeft` value of the outer element | This event is fired after the carousel has been scrolled and any nessecary calculations have taken place. |

