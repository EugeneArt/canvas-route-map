# Route map on canvas

## About
*It's a library for creating route from point A to point B by image. The library uses A* Search Algorithm([javascript-astar](https://github.com/bgrins/javascript-astar)) to make route.

## Features

* Draw a route on map;
* There are available zoom and touch events;
* Add image to point;
* Animate route be use image;

This library is written in Vanilla JS.

## Installing

## Options

## Usage
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
  },
});
```

## Authors
__*Eugene Artsiukhevich*__
