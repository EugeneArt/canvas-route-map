import './astar.js';

export default class RouteMap {
  constructor(image, trackColor = {r: 255, g: 255, b: 255}, diagonal = true) {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.trackColor = trackColor;
    this.diagonal = diagonal;

  }

  getMap(x = 0, y = 0) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas
        .getContext('2d')
        .drawImage(
            this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);

    return this.canvas;
  }

  setOptions(options) {
    this.options = options;
  }

  getBinaryArray() {
    const width = this.canvas.width % 2 === 0 ? this.canvas.width - 1 : this.canvas.width;
    const height = this.canvas.height;
    const map = this.ctx.getImageData(0, 0, width, height);
    let imageData = map.data;
    let r, g, b;
    let zeroesAndOnes = [];
    let currentInnerArray = [];

    for (let p = 0, len = imageData.length; p < len; p += 4) {
      r = imageData[p];
      g = imageData[p + 1];
      b = imageData[p + 2];

      if (p % width * 4 === 0) {
        currentInnerArray = [];
        zeroesAndOnes.push(currentInnerArray);
      }
      if (r === this.trackColor.r && g === this.trackColor.g && b === this.trackColor.b) {
        currentInnerArray.push(1);
      } else {
        currentInnerArray.push(0);
      }
    }
    this.ctx.putImageData(map, 0, 0);

    return zeroesAndOnes;
  }

  getPath() {
    const arr = this.getBinaryArray();
    let graph = new Graph(arr, {diagonal: this.options.diagonal});

    let startCoordinate = graph.grid[this.options.startPoint.coordinates.y][this.options.startPoint.coordinates.x];
    let endCoordinate = graph.grid[this.options.endPoint.coordinates.y][this.options.endPoint.coordinates.x];

    return astar.search(graph, startCoordinate, endCoordinate);
  }

  drawPoint(image, x, y, position = 'up') {
    let coordinates = {};

    switch (position) {
      case 'up':
        coordinates.x = x - image.width / 2;
        coordinates.y = y - image.height;
        break;
      case 'center':
        coordinates.x = x;
        coordinates.y = y;
        break;
    }

    this.ctx
        .drawImage(
            image,
            coordinates.x,
            coordinates.y,
            image.width,
            image.height);

  }
}
