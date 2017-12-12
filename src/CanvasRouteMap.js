import Canvas from './Canvas.js';
import RouteMap from './RouteMap.js';
import Point from './Point.js';
import {loadImage} from './loaders.js';

const privateMethods = {
  createMap() {
    this.mapEntity = new RouteMap(this.image, this.options.map.trackColor, this.options.map.diagonal);
    this.mapCanvas = this.mapEntity.getMap();

    if (Object.keys(this.options.map).length) {
      this.mapEntity.setOptions(this.options.map);

      if (this.startPointImage) {
        const startPointEntity = new Point(this.startPointImage, this.options.map.startPoint.image.width, this.options.map.startPoint.image.height);
        this.mapEntity.drawPoint(startPointEntity.getPoint(), this.options.map.startPoint.coordinates.x, this.options.map.startPoint.coordinates.y, this.options.map.startPoint.image.position);
      }
      if (this.endPointImage) {
        const endPointEntity = new Point(this.endPointImage, this.options.map.endPoint.image.width, this.options.map.endPoint.image.height);
        this.mapEntity.drawPoint(endPointEntity.getPoint(), this.options.map.endPoint.coordinates.x, this.options.map.endPoint.coordinates.y, this.options.map.endPoint.image.position);
      }
    }
  },
  createCanvas() {
    this.canvasEntity = new Canvas(this.mapCanvas, this.options.canvas.width, this.options.canvas.height, this.options.canvas.initialWidth, this.options.canvas.scale, this.options.canvas.zoom);
    this.canvas = this.canvasEntity.getCanvas();

    if (this.isDrawPath) {
      const path = this.mapEntity.getPath();
      if (this.feetImage) {
        this.feetEntity = new Point(this.feetImage, this.options.map.route.image.width, this.options.map.route.image.height);
        this.canvasEntity.animatePathWithImage(path, this.options.map.route.animateSpeed, this.options.map.route.step, this.feetEntity.getPoint());
      } else {
        this.canvasEntity.animatePathWithDrawing(path, this.options.map.route.animateSpeed, this.options.map.route.step, this.options.map.route.drawing.color, this.options.map.route.drawing.printWeight);
      }
    }

    this.container.append(this.canvas);
  }
};

export default class CanvasRouteMap {
  constructor(options) {
    if (!options || !options.container || !options.url) {
      throw 'CanvasRouteMap constructor: missing argument container or url';
    }

    this.container = options.container;
    this.url = options.url;

    this.options = {};
    this.options.canvas = options.canvas || {};
    this.options.map = options.map || {};

    this.options.map.startPoint = options.map.startPoint || {};
    if (Object.keys(this.options.map.startPoint).length && !this.options.map.startPoint.coordinates) {
      throw 'CanvasRouteMap constructor: missing argument coordinates in startPoint';
    }

    this.options.map.endPoint = options.map.endPoint || {};
    if (Object.keys(this.options.map.endPoint).length && !this.options.map.endPoint.coordinates) {
      throw 'CanvasRouteMap constructor: missing argument coordinates in endPoint';
    }

    this.isDrawPath = Object.keys(this.options.map.startPoint).length && Object.keys(this.options.map.endPoint).length;

    this.options.map.route = options.map.route || {};

    this.options.map.route.drawing = options.map.route.drawing || {};
    this.options.map.route.image = options.map.route.image || {};

    this.initialization = (async () => {
      this.image = await loadImage(this.url);

      if (this.options.map.startPoint.image) {
        this.startPointImage = await loadImage(this.options.map.startPoint.image.url);
      }
      if (this.options.map.endPoint.image) {
        this.endPointImage = await loadImage(this.options.map.endPoint.image.url);
      }
      if (this.options.map.route.image.url) {
        this.feetImage = await loadImage(this.options.map.route.image.url);
      }
    })();

    this.initialize();
  }

  async initialize() {
    await this.initialization;
    privateMethods.createMap.call(this);
    privateMethods.createCanvas.call(this);
  }
}






