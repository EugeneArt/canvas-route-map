(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("canvasRouteMap", [], factory);
	else if(typeof exports === 'object')
		exports["canvasRouteMap"] = factory();
	else
		root["canvasRouteMap"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasRouteMap = undefined;

var _CanvasRouteMap = __webpack_require__(1);

var _CanvasRouteMap2 = _interopRequireDefault(_CanvasRouteMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CanvasRouteMap = _CanvasRouteMap2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = __webpack_require__(2);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _RouteMap = __webpack_require__(3);

var _RouteMap2 = _interopRequireDefault(_RouteMap);

var _Point = __webpack_require__(6);

var _Point2 = _interopRequireDefault(_Point);

var _loaders = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateMethods = {
  createMap: function createMap() {
    this.mapEntity = new _RouteMap2.default(this.image, this.options.map.trackColor, this.options.map.diagonal);
    this.mapCanvas = this.mapEntity.getMap();

    if (Object.keys(this.options.map).length) {
      this.mapEntity.setOptions(this.options.map);

      if (this.startPointImage) {
        var startPointEntity = new _Point2.default(this.startPointImage, this.options.map.startPoint.image.width, this.options.map.startPoint.image.height);
        this.mapEntity.drawPoint(startPointEntity.getPoint(), this.options.map.startPoint.coordinates.x, this.options.map.startPoint.coordinates.y, this.options.map.startPoint.image.position);
      }
      if (this.endPointImage) {
        var endPointEntity = new _Point2.default(this.endPointImage, this.options.map.endPoint.image.width, this.options.map.endPoint.image.height);
        this.mapEntity.drawPoint(endPointEntity.getPoint(), this.options.map.endPoint.coordinates.x, this.options.map.endPoint.coordinates.y, this.options.map.endPoint.image.position);
      }
    }
  },
  createCanvas: function createCanvas() {
    this.canvasEntity = new _Canvas2.default(this.mapCanvas, this.options.canvas.width, this.options.canvas.height, this.options.canvas.initialWidth, this.options.canvas.scale, this.options.canvas.zoom);
    this.canvas = this.canvasEntity.getCanvas();

    if (this.isDrawPath) {
      var path = this.mapEntity.getPath();
      if (this.feetImage) {
        this.feetEntity = new _Point2.default(this.feetImage, this.options.map.route.image.width, this.options.map.route.image.height);
        this.canvasEntity.animatePathWithImage(path, this.options.map.route.animateSpeed, this.options.map.route.step, this.feetEntity.getPoint());
      } else {
        this.canvasEntity.animatePathWithDrawing(path, this.options.map.route.animateSpeed, this.options.map.route.step, this.options.map.route.drawing.color, this.options.map.route.drawing.printWeight);
      }
    }

    this.container.append(this.canvas);
  }
};

var CanvasRouteMap = function () {
  function CanvasRouteMap(options) {
    var _this = this;

    _classCallCheck(this, CanvasRouteMap);

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

    this.initialization = async function () {
      _this.image = await (0, _loaders.loadImage)(_this.url);

      if (_this.options.map.startPoint.image) {
        _this.startPointImage = await (0, _loaders.loadImage)(_this.options.map.startPoint.image.url);
      }
      if (_this.options.map.endPoint.image) {
        _this.endPointImage = await (0, _loaders.loadImage)(_this.options.map.endPoint.image.url);
      }
      if (_this.options.map.route.image.url) {
        _this.feetImage = await (0, _loaders.loadImage)(_this.options.map.route.image.url);
      }
    }();

    this.initialize();
  }

  _createClass(CanvasRouteMap, [{
    key: 'initialize',
    value: async function initialize() {
      await this.initialization;
      privateMethods.createMap.call(this);
      privateMethods.createCanvas.call(this);
    }
  }]);

  return CanvasRouteMap;
}();

exports.default = CanvasRouteMap;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mouseEvents = {
  mouseDown: function mouseDown(e) {
    // get the current mouse position
    var r = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - r.left - this.canvasPosition.deltaX;
    this.mouseY = e.clientY - r.top - this.canvasPosition.deltaY;

    this.dragging = true;
  },
  mouseUp: function mouseUp() {
    this.dragging = false;
  },
  mouseMove: function mouseMove(e) {
    if (this.dragging) {
      // get the current mouse position (updates every time the mouse is moved durring dragging)
      var r = this.canvas.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;

      // calculate how far we moved
      this.tmpCanvasPosX = x - this.mouseX; // total distance in x
      this.tmpCanvasPosY = y - this.mouseY; // total distance in y

      canvasEvents.updateCanvasAfterMove.call(this);
    }
  },
  mouseWheel: function mouseWheel(e) {
    var delta = 0;
    var r = this.canvas.getBoundingClientRect();

    if (e.wheelDelta) {
      delta = e.wheelDelta / 120;
    } else if (e.detail) {
      delta = -e.detail / 3;
    }

    var canvasZoomX = e.clientX - r.left;
    var canvasZoomY = e.clientY - r.top;

    if (delta > 0) {
      if (this.zoomCount < this.clientZoom) {
        this.zoomCount += 1;

        // pinchZoomInG IN
        this.zoomedX = this.canvasPosition.deltaX - (canvasZoomX - this.canvasPosition.deltaX);
        this.zoomedY = this.canvasPosition.deltaY - (canvasZoomY - this.canvasPosition.deltaY);

        // scale the image up by 2
        this.initialImageWidth = this.initialImageWidth * 2;
        this.zoom = this.zoom * 2;
      }
    } else {
      if (this.zoomCount > -this.clientZoom) {
        this.zoomCount -= 1;

        // pinchZoomInG OUT
        this.zoomedX = (this.canvasPosition.deltaX + canvasZoomX) / 2;
        this.zoomedY = (this.canvasPosition.deltaY + canvasZoomY) / 2;

        // scale the image down by 2
        this.initialImageWidth = this.initialImageWidth / 2;
        this.zoom = this.zoom / 2;
      }
    }
    canvasEvents.updateCanvasAfterZoom.call(this);
  }
};

var touchEvents = {
  touchStart: function touchStart(e) {
    // get the current touch position
    var r = this.canvas.getBoundingClientRect();
    this.touchX = e.touches[0].clientX - r.left - this.canvasPosition.deltaX;
    this.touchY = e.touches[0].clientY - r.top - this.canvasPosition.deltaY;

    this.dragging = true;

    if (e.touches.length === 2) {
      this.scaling = true;
      this.dragging = false;
      touchEvents.pinchStart.call(this, e);
    }
  },
  touchEnd: function touchEnd() {
    this.dragging = false;
    if (this.scaling) {
      touchEvents.pinchEnd.call(this);
    }
  },
  touchMove: function touchMove(e) {
    if (this.dragging) {
      // get the current touch position (updates every time the touch is moved durring dragging)
      var r = this.canvas.getBoundingClientRect();
      var x = e.touches[0].clientX - r.left;
      var y = e.touches[0].clientY - r.top;

      // calculate how far we moved
      this.tmpCanvasPosX = x - this.touchX; // total distance in x
      this.tmpCanvasPosY = y - this.touchY; // total distance in y

      canvasEvents.updateCanvasAfterMove.call(this);
    } else if (this.scaling) {
      touchEvents.pinchMove.call(this, e);
    }
  },
  pinchStart: function pinchStart(e) {
    this.pinchDistStart = Math.sqrt((e.touches[0].clientX - e.touches[1].clientX) * (e.touches[0].clientX - e.touches[1].clientX) + (e.touches[0].clientY - e.touches[1].clientY) * (e.touches[0].clientY - e.touches[1].clientY));
  },
  pinchEnd: function pinchEnd() {
    this.scaling = false;
  },
  pinchMove: function pinchMove(e) {
    var r = this.canvas.getBoundingClientRect();

    var dist = Math.sqrt((e.touches[0].clientX - e.touches[1].clientX) * (e.touches[0].clientX - e.touches[1].clientX) + (e.touches[0].clientY - e.touches[1].clientY) * (e.touches[0].clientY - e.touches[1].clientY));

    var touchClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    var touchClientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

    var canvasZoomX = touchClientX - r.left;
    var canvasZoomY = touchClientY - r.top;

    this.pinchCounter += 1;
    if (this.pinchCounter === this.fluency) {
      this.pinchCounter = 0;
      if (this.pinchDistStart - dist < 0) {
        if (this.zoomCount < 2) {
          touchEvents.pinchZoomIn.call(this, canvasZoomX, canvasZoomY);
          this.zoom = this.zoom * 2;
          this.zoomCount += 1;
        }
      } else {
        if (this.zoomCount > -2) {
          touchEvents.pinchZoomOut.call(this, canvasZoomX, canvasZoomY);
          this.zoom = this.zoom / 2;
          this.zoomCount -= 1;
        }
      }
      canvasEvents.updateCanvasAfterZoom.call(this);
    }
  },
  pinchZoomIn: function pinchZoomIn(canvasZoomX, canvasZoomY) {
    this.zoomedX = this.canvasPosition.deltaX - (canvasZoomX - this.canvasPosition.deltaX);
    this.zoomedY = this.canvasPosition.deltaY - (canvasZoomY - this.canvasPosition.deltaY);

    this.initialImageWidth = this.initialImageWidth * 2;
  },
  pinchZoomOut: function pinchZoomOut(canvasZoomX, canvasZoomY) {
    this.zoomedX = (this.canvasPosition.deltaX + canvasZoomX) / 2;
    this.zoomedY = (this.canvasPosition.deltaY + canvasZoomY) / 2;

    this.initialImageWidth = this.initialImageWidth / 2;
  }
};

var canvasEvents = {
  renderPath: function renderPath() {
    for (var i = 0; i < this.pathBuffer.length; i += 1) {
      if (this.feetImage) {
        this.ctx.drawImage(this.feetImage, this.pathBuffer[i].y * this.zoom + this.canvasPosition.deltaX, this.pathBuffer[i].x * this.zoom + this.canvasPosition.deltaY, this.feetImage.width * this.zoom, this.feetImage.height * this.zoom);
      } else {
        this.ctx.fillRect(this.pathBuffer[i].y * this.zoom + this.canvasPosition.deltaX, this.pathBuffer[i].x * this.zoom + this.canvasPosition.deltaY, this.print * this.zoom, this.print * this.zoom);
      }
    }
  },
  renderCanvas: function renderCanvas() {
    // we need to clear the canvas, otherwise we'll have a bunch of overlapping images
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);

    // these will be our new x,y position to move the image.
    this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
  },
  updateCanvasAfterMove: function updateCanvasAfterMove() {
    //restrict canvas area
    if (this.tmpCanvasPosX > this.initialImageWidth / this.zoom - this.initialImageWidth * 0.2 / this.zoom || this.tmpCanvasPosX < -(this.initialImageWidth - this.initialImageWidth * 0.2) || this.tmpCanvasPosY > this.newImageHeight / this.zoom - this.newImageHeight * 0.2 / this.zoom || this.tmpCanvasPosY < -(this.newImageHeight - this.newImageHeight * 0.2)) {
      return false;
    }

    this.canvasPosition.deltaX = this.tmpCanvasPosX;
    this.canvasPosition.deltaY = this.tmpCanvasPosY;

    canvasEvents.renderCanvas.call(this);
    canvasEvents.renderPath.call(this);
  },
  updateCanvasAfterZoom: function updateCanvasAfterZoom() {
    this.newImageHeight = this.imageHeight / this.imageWidth * this.initialImageWidth;

    // update the new canvas position
    this.canvasPosition.deltaX = this.zoomedX;
    this.canvasPosition.deltaY = this.zoomedY;

    canvasEvents.renderCanvas.call(this);
    canvasEvents.renderPath.call(this);
  }
};

var Canvas = function () {
  function Canvas(image) {
    var canvasWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
    var canvasHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var initialImageWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1080;
    var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var zoom = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;

    _classCallCheck(this, Canvas);

    this.image = image;
    this.imageWidth = image.width;
    this.imageHeight = image.height;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.initialImageWidth = initialImageWidth;
    this.scale = scale;
    this.clientZoom = zoom;

    this.newImageHeight = this.imageHeight / this.imageWidth * this.initialImageWidth;

    this.canvasCenterX = this.canvasWidth / 2;
    this.canvasCenterY = this.canvasHeight / 2;

    this.canvasPosition = {
      deltaX: 0,
      deltaY: 0
    };

    this.pinchCounter = 0;
    this.fluency = 5;
    this.zoom = 1;
    this.zoomCount = 0;
    this.pathBuffer = [];

    this.dragging = false;

    if (this.scale) {
      this.canvas.addEventListener('touchstart', touchEvents.touchStart.bind(this));
      this.canvas.addEventListener('touchmove', touchEvents.touchMove.bind(this));
      this.canvas.addEventListener('touchend', touchEvents.touchEnd.bind(this));

      this.canvas.addEventListener('mousedown', mouseEvents.mouseDown.bind(this));
      this.canvas.addEventListener('mousemove', mouseEvents.mouseMove.bind(this));
      this.canvas.addEventListener('mouseup', mouseEvents.mouseUp.bind(this));
      this.canvas.addEventListener('mousewheel', mouseEvents.mouseWheel.bind(this));
      this.canvas.addEventListener('DOMMouseScroll', mouseEvents.mouseWheel.bind(this));
    }
  }

  _createClass(Canvas, [{
    key: 'getCanvas',
    value: function getCanvas() {
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;

      // center of the image currently
      var imageCenterX = this.initialImageWidth / 2;
      var imageCenterY = this.newImageHeight / 2;

      // subtract the canvas size by the image center, that's how far we need to move it.
      this.imageXPos = this.canvasCenterX - imageCenterX;
      this.imageYPos = this.canvasCenterY - imageCenterY;

      this.canvasPosition.deltaX = this.imageXPos;
      this.canvasPosition.deltaY = this.imageYPos;

      this.canvas.getContext('2d').drawImage(this.image, this.imageXPos, this.imageYPos, this.initialImageWidth, this.newImageHeight);

      return this.canvas;
    }
  }, {
    key: 'animatePathWithImage',
    value: function animatePathWithImage(path) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

      var _this = this;

      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
      var image = arguments[3];

      this.feetImage = image;
      var i = 0;
      var timerId = setInterval(function () {
        _this.pathBuffer.push(path[i]);
        if (_this.feetImage) {
          _this.ctx.drawImage(_this.feetImage, path[i].y * _this.zoom + _this.canvasPosition.deltaX, path[i].x * _this.zoom + _this.canvasPosition.deltaY, _this.feetImage.width * _this.zoom, _this.feetImage.height * _this.zoom);
        } else {
          _this.ctx.fillRect(path[i].y * _this.zoom + _this.canvasPosition.deltaX, path[i].x * _this.zoom + _this.canvasPosition.deltaY, _this.print * _this.zoom, _this.print * _this.zoom);
        }

        if (i + step >= path.length) clearInterval(timerId);
        i += step;
      }, speed);

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
      this.pathBuffer = [];

      setTimeout(this.animatePathWithImage.bind(this, path, speed, step, image), path.length * speed / 10);
    }
  }, {
    key: 'animatePathWithDrawing',
    value: function animatePathWithDrawing(path) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

      var _this2 = this;

      var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#f00';
      var printWeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;

      this.print = printWeight;

      var i = 0;
      var timerId = setInterval(function () {
        _this2.pathBuffer.push(path[i]);
        _this2.ctx.fillStyle = color;
        _this2.ctx.fillRect(path[i].y * _this2.zoom + _this2.canvasPosition.deltaX, path[i].x * _this2.zoom + _this2.canvasPosition.deltaY, _this2.print * _this2.zoom, _this2.print * _this2.zoom);

        if (i + step >= path.length) clearInterval(timerId);
        i += step;
      }, speed);

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
      this.pathBuffer = [];

      setTimeout(this.animatePathWithDrawing.bind(this, path, speed, step, color, printWeight), path.length * speed / 10);
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteMap = function () {
  function RouteMap(image) {
    var trackColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { r: 255, g: 255, b: 255 };
    var diagonal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, RouteMap);

    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.trackColor = trackColor;
    this.diagonal = diagonal;
  }

  _createClass(RouteMap, [{
    key: 'getMap',
    value: function getMap() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.getContext('2d').drawImage(this.image, x * this.width, y * this.height, this.width, this.height, 0, 0, this.width, this.height);

      return this.canvas;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: 'getBinaryArray',
    value: function getBinaryArray() {
      var width = this.canvas.width % 2 === 0 ? this.canvas.width - 1 : this.canvas.width;
      var height = this.canvas.height;
      var map = this.ctx.getImageData(0, 0, width, height);
      var imageData = map.data;
      var r = void 0,
          g = void 0,
          b = void 0;
      var zeroesAndOnes = [];
      var currentInnerArray = [];

      for (var p = 0, len = imageData.length; p < len; p += 4) {
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
  }, {
    key: 'getPath',
    value: function getPath() {
      var arr = this.getBinaryArray();
      var graph = new Graph(arr, { diagonal: this.options.diagonal });

      var startCoordinate = graph.grid[this.options.startPoint.coordinates.y][this.options.startPoint.coordinates.x];
      var endCoordinate = graph.grid[this.options.endPoint.coordinates.y][this.options.endPoint.coordinates.x];

      return astar.search(graph, startCoordinate, endCoordinate);
    }
  }, {
    key: 'drawPoint',
    value: function drawPoint(image, x, y) {
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'up';

      var coordinates = {};

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

      this.ctx.drawImage(image, coordinates.x, coordinates.y, image.width, image.height);
    }
  }]);

  return RouteMap;
}();

exports.default = RouteMap;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html

(function (definition) {
    /* global module, define */
    if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        module.exports = definition();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var exports = definition();
        window.astar = exports.astar;
        window.Graph = exports.Graph;
    }
})(function () {

    function pathTo(node) {
        var curr = node,
            path = [];
        while (curr.parent) {
            path.unshift(curr);
            curr = curr.parent;
        }
        return path;
    }

    function getHeap() {
        return new BinaryHeap(function (node) {
            return node.f;
        });
    }

    var astar = {
        /**
        * Perform an A* Search on a graph given a start and end node.
        * @param {Graph} graph
        * @param {GridNode} start
        * @param {GridNode} end
        * @param {Object} [options]
        * @param {bool} [options.closest] Specifies whether to return the
                   path to the closest node if the target is unreachable.
        * @param {Function} [options.heuristic] Heuristic function (see
        *          astar.heuristics).
        */
        search: function search(graph, start, end, options) {
            graph.cleanDirty();
            options = options || {};
            var heuristic = options.heuristic || astar.heuristics.manhattan,
                closest = options.closest || false;

            var openHeap = getHeap(),
                closestNode = start; // set the start node to be the closest if required

            start.h = heuristic(start, end);

            openHeap.push(start);

            while (openHeap.size() > 0) {

                // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
                var currentNode = openHeap.pop();

                // End case -- result has been found, return the traced path.
                if (currentNode === end) {
                    return pathTo(currentNode);
                }

                // Normal case -- move currentNode from open to closed, process each of its neighbors.
                currentNode.closed = true;

                // Find all neighbors for the current node.
                var neighbors = graph.neighbors(currentNode);

                for (var i = 0, il = neighbors.length; i < il; ++i) {
                    var neighbor = neighbors[i];

                    if (neighbor.closed || neighbor.isWall()) {
                        // Not a valid node to process, skip to next neighbor.
                        continue;
                    }

                    // The g score is the shortest distance from start to current node.
                    // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                    var gScore = currentNode.g + neighbor.getCost(currentNode),
                        beenVisited = neighbor.visited;

                    if (!beenVisited || gScore < neighbor.g) {

                        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                        neighbor.visited = true;
                        neighbor.parent = currentNode;
                        neighbor.h = neighbor.h || heuristic(neighbor, end);
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;
                        graph.markDirty(neighbor);
                        if (closest) {
                            // If the neighbour is closer than the current closestNode or if it's equally close but has
                            // a cheaper path than the current closest node then it becomes the closest node
                            if (neighbor.h < closestNode.h || neighbor.h === closestNode.h && neighbor.g < closestNode.g) {
                                closestNode = neighbor;
                            }
                        }

                        if (!beenVisited) {
                            // Pushing to heap will put it in proper place based on the 'f' value.
                            openHeap.push(neighbor);
                        } else {
                            // Already seen the node, but since it has been rescored we need to reorder it in the heap
                            openHeap.rescoreElement(neighbor);
                        }
                    }
                }
            }

            if (closest) {
                return pathTo(closestNode);
            }

            // No result was found - empty array signifies failure to find path.
            return [];
        },
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
        heuristics: {
            manhattan: function manhattan(pos0, pos1) {
                var d1 = Math.abs(pos1.x - pos0.x);
                var d2 = Math.abs(pos1.y - pos0.y);
                return d1 + d2;
            },
            diagonal: function diagonal(pos0, pos1) {
                var D = 1;
                var D2 = Math.sqrt(2);
                var d1 = Math.abs(pos1.x - pos0.x);
                var d2 = Math.abs(pos1.y - pos0.y);
                return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
            }
        },
        cleanNode: function cleanNode(node) {
            node.f = 0;
            node.g = 0;
            node.h = 0;
            node.visited = false;
            node.closed = false;
            node.parent = null;
        }
    };

    /**
    * A graph memory structure
    * @param {Array} gridIn 2D array of input weights
    * @param {Object} [options]
    * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
    */
    function Graph(gridIn, options) {
        options = options || {};
        this.nodes = [];
        this.diagonal = !!options.diagonal;
        this.grid = [];
        for (var x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];

            for (var y = 0, row = gridIn[x]; y < row.length; y++) {
                var node = new GridNode(x, y, row[y]);
                this.grid[x][y] = node;
                this.nodes.push(node);
            }
        }
        this.init();
    }

    Graph.prototype.init = function () {
        this.dirtyNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
            astar.cleanNode(this.nodes[i]);
        }
    };

    Graph.prototype.cleanDirty = function () {
        for (var i = 0; i < this.dirtyNodes.length; i++) {
            astar.cleanNode(this.dirtyNodes[i]);
        }
        this.dirtyNodes = [];
    };

    Graph.prototype.markDirty = function (node) {
        this.dirtyNodes.push(node);
    };

    Graph.prototype.neighbors = function (node) {
        var ret = [],
            x = node.x,
            y = node.y,
            grid = this.grid;

        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }

        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }

        // South
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }

        // North
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }

        if (this.diagonal) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1]);
            }

            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1]);
            }

            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1]);
            }

            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1]);
            }
        }

        return ret;
    };

    Graph.prototype.toString = function () {
        var graphString = [],
            nodes = this.grid,
            // when using grid
        rowDebug,
            row,
            y,
            l;
        for (var x = 0, len = nodes.length; x < len; x++) {
            rowDebug = [];
            row = nodes[x];
            for (y = 0, l = row.length; y < l; y++) {
                rowDebug.push(row[y].weight);
            }
            graphString.push(rowDebug.join(" "));
        }
        return graphString.join("\n");
    };

    function GridNode(x, y, weight) {
        this.x = x;
        this.y = y;
        this.weight = weight;
    }

    GridNode.prototype.toString = function () {
        return "[" + this.x + " " + this.y + "]";
    };

    GridNode.prototype.getCost = function (fromNeighbor) {
        // Take diagonal weight into consideration.
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * 1.41421;
        }
        return this.weight;
    };

    GridNode.prototype.isWall = function () {
        return this.weight === 0;
    };

    function BinaryHeap(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    BinaryHeap.prototype = {
        push: function push(element) {
            // Add the new element to the end of the array.
            this.content.push(element);

            // Allow it to sink down.
            this.sinkDown(this.content.length - 1);
        },
        pop: function pop() {
            // Store the first element so we can return it later.
            var result = this.content[0];
            // Get the element at the end of the array.
            var end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it bubble up.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.bubbleUp(0);
            }
            return result;
        },
        remove: function remove(node) {
            var i = this.content.indexOf(node);

            // When it is found, the process seen in 'pop' is repeated
            // to fill up the hole.
            var end = this.content.pop();

            if (i !== this.content.length - 1) {
                this.content[i] = end;

                if (this.scoreFunction(end) < this.scoreFunction(node)) {
                    this.sinkDown(i);
                } else {
                    this.bubbleUp(i);
                }
            }
        },
        size: function size() {
            return this.content.length;
        },
        rescoreElement: function rescoreElement(node) {
            this.sinkDown(this.content.indexOf(node));
        },
        sinkDown: function sinkDown(n) {
            // Fetch the element that has to be sunk.
            var element = this.content[n];

            // When at 0, an element can not sink any further.
            while (n > 0) {

                // Compute the parent element's index, and fetch it.
                var parentN = (n + 1 >> 1) - 1,
                    parent = this.content[parentN];
                // Swap the elements if the parent is greater.
                if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                    this.content[parentN] = element;
                    this.content[n] = parent;
                    // Update 'n' to continue at the new position.
                    n = parentN;
                }
                // Found a parent that is less, no need to sink any further.
                else {
                        break;
                    }
            }
        },
        bubbleUp: function bubbleUp(n) {
            // Look up the target element and its score.
            var length = this.content.length,
                element = this.content[n],
                elemScore = this.scoreFunction(element);

            while (true) {
                // Compute the indices of the child elements.
                var child2N = n + 1 << 1,
                    child1N = child2N - 1;
                // This is used to store the new position of the element, if any.
                var swap = null,
                    child1Score;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    var child1 = this.content[child1N];
                    child1Score = this.scoreFunction(child1);

                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore) {
                        swap = child1N;
                    }
                }

                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = this.content[child2N],
                        child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap === null ? elemScore : child1Score)) {
                        swap = child2N;
                    }
                }

                // If the element needs to be moved, swap it, and continue.
                if (swap !== null) {
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                }
                // Otherwise, we are done.
                else {
                        break;
                    }
            }
        }
    };

    return {
        astar: astar,
        Graph: Graph
    };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(image, width, height) {
    _classCallCheck(this, Point);

    this.image = image;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width || this.image.width;
    this.canvas.height = height || this.image.height;
  }

  _createClass(Point, [{
    key: 'getPoint',
    value: function getPoint() {
      this.canvas.getContext('2d').drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
      return this.canvas;
    }
  }]);

  return Point;
}();

exports.default = Point;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImage = loadImage;
function loadImage(url) {
  return new Promise(function (resolve) {
    var image = new Image();

    image.addEventListener('load', function () {
      resolve(image);
    });
    image.src = url;
    image.crossOrigin = 'Anonymous';
  });
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=canvasRouteMap.js.map