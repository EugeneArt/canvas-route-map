# Route map on canvas

## About
*It's a library for creating route from point A to point B by image. The library uses A* Search Algorithm([javascript-astar](https://github.com/bgrins/javascript-astar)) to make a route.

## Features

* Draw a route on map;
* Animate route by use image;
* There are available zoom and touch events;
* Add image to point;

This library is written in Vanilla JS.

## Installing
__NPM__
```javascript
  npm install canvas-route-map
```
## Options
* Required attributes:
  * *__container__ : container* - it's a DOM element to render canvas;
  * *__url__: 'image.png/jpeg/gif/bmp/tiff'* - path to image.
* Canvas attributes:
  * *__width__(default: 1080)* - canvas width;
  * *__height__(default: 608)* - canvas height;
  * *__initialWidth__(Default: 1080)* - image width;
  * *__scale__(default: true)* - scalability of canvas;
  * *__zoom__(default: 2)* - canvas zoom, zoom in and zoom out.
* Map attributes:
  * *__trackColor__(default: r: 255, b: 255, g: 255)* - rgb color value for map, free route in map;
   * *__diagonal__(default: true)* - route in direct line.
  * Points(startPoint, endPoint):
    * *__coordinates__(required): {x,y}* - coordinates where point is located on canvas.
    * Image - image of point;
      * *__url__(required): 'image.png/jpeg/gif/bmp/tiff'* - path to image of point;
       * *__width__(default: 20)* - image width;
       * *__height__(default: 20)* - image height;
       * *__position__(default: 'up')* - image position('center','up').
  * Route:
    * *__animateSpeed__(default: 50)* - speed of animation;
    * *__step__(default: 20)* - step between.
    * Drawing(default):
      * *__color__(default: '#f00')* - route color;
      * *__printWeight__(default: 5)* - weight of print step.
    * Image - image of point;
      * *__url__(required): 'image.png/jpeg/gif/bmp/tiff'* - path to image of point;
      * *__width__(default: 20)* - image width;
      * *__height__(default: 20)* - image height.


## Usage
* Simple example:

```javascript
const map = new canvasRouteMap.CanvasRouteMap({
 container: container,
  url: 'map.png',
  map: {
    startPoint: {
      coordinates: {x: 41, y: 442},
    },
    endPoint: {
      coordinates: {x: 833, y: 196},
    },
   
  },
});

```

* Example with full options:

```javascript
const map = new canvasRouteMap.CanvasRouteMap({
 container: container,
  url: 'map.png',
  canvas: {
    width: 1080,
    height: 608,
    initialWidth: 1080,
    scale: true,
    zoom: 2
  },
  map: {
    trackColor: {r: 255, b: 255, g: 255},
    diagonal: true,
    startPoint: {
      coordinates: {x: 41, y: 442},
      image: {
        url: 'pointA.png',
        width: 50,
        height: 50,
        position: 'up'
      }
    },
    endPoint: {
      coordinates: {x: 833, y: 196},
      image: {
        url: 'pointB.png',
        width: 50,
        height: 50,
        position: 'up'
      }
    },
    route: {
      animateSpeed: 50,
      step: 20,
      drawing: {
        color: '#f00',
        printWeight: 5
      },
      image: {
        url: 'feet.png',
        width: 13,
        height: 8,
      }
    }
  },
});
```

## Authors
__*Eugene Artsiukhevich*__

## Acknowledgments
Maybe, it will be useful for somebody. 

