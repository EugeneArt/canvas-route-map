const mouseEvents = {
  mouseDown(e) {
    // get the current mouse position
    let r = this.canvas.getBoundingClientRect();
    this.mouseX = (e.clientX - r.left) - this.canvasPosition.deltaX;
    this.mouseY = (e.clientY - r.top) - this.canvasPosition.deltaY;

    this.dragging = true;
  },
  mouseUp() {
    this.dragging = false;
  },
  mouseMove(e) {
    if (this.dragging) {
      // get the current mouse position (updates every time the mouse is moved durring dragging)
      let r = this.canvas.getBoundingClientRect();
      let x = e.clientX - r.left;
      let y = e.clientY - r.top;

      // calculate how far we moved
      this.tmpCanvasPosX = (x - this.mouseX); // total distance in x
      this.tmpCanvasPosY = (y - this.mouseY); // total distance in y

      canvasEvents.updateCanvasAfterMove.call(this);
    }
  },
  mouseWheel(e) {
    let delta = 0;
    let r = this.canvas.getBoundingClientRect();

    if (e.wheelDelta) {
      delta = e.wheelDelta / 120;
    }
    else if (e.detail) {
      delta = -e.detail / 3;
    }

    let canvasZoomX = (e.clientX - r.left);
    let canvasZoomY = (e.clientY - r.top);

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
  },
};

const touchEvents = {
  touchStart(e) {
    // get the current touch position
    let r = this.canvas.getBoundingClientRect();
    this.touchX = (e.touches[0].clientX - r.left) - this.canvasPosition.deltaX;
    this.touchY = (e.touches[0].clientY - r.top) - this.canvasPosition.deltaY;

    this.dragging = true;

    if (e.touches.length === 2) {
      this.scaling = true;
      this.dragging = false;
      touchEvents.pinchStart.call(this, e);
    }
  },
  touchEnd() {
    this.dragging = false;
    if (this.scaling) {
      touchEvents.pinchEnd.call(this);
    }
  },
  touchMove(e) {
    if (this.dragging) {
      // get the current touch position (updates every time the touch is moved durring dragging)
      let r = this.canvas.getBoundingClientRect();
      let x = e.touches[0].clientX - r.left;
      let y = e.touches[0].clientY - r.top;

      // calculate how far we moved
      this.tmpCanvasPosX = (x - this.touchX); // total distance in x
      this.tmpCanvasPosY = (y - this.touchY); // total distance in y

      canvasEvents.updateCanvasAfterMove.call(this);
    } else if (this.scaling) {
      touchEvents.pinchMove.call(this, e);
    }
  },
  pinchStart(e) {
    this.pinchDistStart = Math.sqrt(
      (e.touches[0].clientX - e.touches[1].clientX) * (e.touches[0].clientX - e.touches[1].clientX) +
      (e.touches[0].clientY - e.touches[1].clientY) * (e.touches[0].clientY - e.touches[1].clientY)
    );
  },
  pinchEnd() {
    this.scaling = false;
  },
  pinchMove(e) {
    let r = this.canvas.getBoundingClientRect();

    let dist = Math.sqrt(
      (e.touches[0].clientX - e.touches[1].clientX) * (e.touches[0].clientX - e.touches[1].clientX) +
      (e.touches[0].clientY - e.touches[1].clientY) * (e.touches[0].clientY - e.touches[1].clientY)
    );

    let touchClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    let touchClientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

    let canvasZoomX = (touchClientX - r.left);
    let canvasZoomY = (touchClientY - r.top);

    this.pinchCounter += 1;
    if (this.pinchCounter === this.fluency) {
      this.pinchCounter = 0;
      if (this.pinchDistStart - dist < 0) {
        if (this.zoomCount < 2) {
          touchEvents.pinchZoomIn.call(this, canvasZoomX, canvasZoomY);
          this.zoom = this.zoom * 2;
          this.zoomCount += 1;
        }
      }
      else {
        if (this.zoomCount > -2) {
          touchEvents.pinchZoomOut.call(this, canvasZoomX, canvasZoomY);
          this.zoom = this.zoom / 2;
          this.zoomCount -= 1;
        }
      }
      canvasEvents.updateCanvasAfterZoom.call(this);
    }
  },
  pinchZoomIn(canvasZoomX, canvasZoomY) {
    this.zoomedX = this.canvasPosition.deltaX - (canvasZoomX - this.canvasPosition.deltaX);
    this.zoomedY = this.canvasPosition.deltaY - (canvasZoomY - this.canvasPosition.deltaY);

    this.initialImageWidth = this.initialImageWidth * 2;
  },
  pinchZoomOut(canvasZoomX, canvasZoomY) {
    this.zoomedX = (this.canvasPosition.deltaX + canvasZoomX) / 2;
    this.zoomedY = (this.canvasPosition.deltaY + canvasZoomY) / 2;

    this.initialImageWidth = this.initialImageWidth / 2;
  },
};


const canvasEvents = {
  renderPath() {
    for (let i = 0; i < this.pathBuffer.length; i += 1) {
      if (this.feetImage) {
        this.ctx.drawImage(this.feetImage, (this.pathBuffer[i].y * this.zoom + this.canvasPosition.deltaX), (this.pathBuffer[i].x * this.zoom + this.canvasPosition.deltaY), this.feetImage.width * this.zoom, this.feetImage.height * this.zoom);
      } else {
        this.ctx.fillRect((this.pathBuffer[i].y * this.zoom + this.canvasPosition.deltaX), (this.pathBuffer[i].x * this.zoom + this.canvasPosition.deltaY), this.print * this.zoom, this.print * this.zoom);
      }
    }
  },
  renderCanvas() {
    // we need to clear the canvas, otherwise we'll have a bunch of overlapping images
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);

    // these will be our new x,y position to move the image.
    this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
  },
  updateCanvasAfterMove() {
    //restrict canvas area
    if (this.tmpCanvasPosX > (this.initialImageWidth / this.zoom - this.initialImageWidth * 0.5 / this.zoom) ||
      (this.tmpCanvasPosX < -(this.initialImageWidth - this.initialImageWidth * 0.3)) ||
      (this.tmpCanvasPosY > (this.newImageHeight / this.zoom - this.newImageHeight * 0.3 / this.zoom)) ||
      (this.tmpCanvasPosY < -(this.newImageHeight - this.newImageHeight * 0.3))
    ) {
      return false;
    }

    this.canvasPosition.deltaX = this.tmpCanvasPosX;
    this.canvasPosition.deltaY = this.tmpCanvasPosY;

    canvasEvents.renderCanvas.call(this);
    canvasEvents.renderPath.call(this);
  },
  updateCanvasAfterZoom() {
    this.newImageHeight = this.imageHeight / this.imageWidth * this.initialImageWidth;

    // update the new canvas position
    this.canvasPosition.deltaX = this.zoomedX;
    this.canvasPosition.deltaY = this.zoomedY;

    canvasEvents.renderCanvas.call(this);
    canvasEvents.renderPath.call(this);
  },
};

export default class Canvas {
  constructor(image,
              canvasWidth = 600,
              canvasHeight = 600,
              initialImageWidth = 1080,
              scale = true,
              zoom = 2,
              coordinates) {

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
    this.coordinates = coordinates;

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

  getCanvas() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    // center of the image currently
    let imageCenterX = this.coordinates.x || this.initialImageWidth / 2;
    let imageCenterY = this.coordinates.y || this.newImageHeight / 2;

    // subtract the canvas size by the image center, that's how far we need to move it.
    this.imageXPos = this.canvasCenterX - imageCenterX;
    this.imageYPos = this.canvasCenterY - imageCenterY;

    this.canvasPosition.deltaX = this.imageXPos;
    this.canvasPosition.deltaY = this.imageYPos;

    this.canvas
      .getContext('2d')
      .drawImage(
        this.image,
        this.imageXPos,
        this.imageYPos,
        this.initialImageWidth,
        this.newImageHeight);

    return this.canvas;
  }

  animatePathWithImage(path, speed = 50, step = 20, image) {
    this.feetImage = image;
    animate.call(this);

    let i = 0;
    let timerId;

    function animate() {
      setTimeout(() => {
        timerId = requestAnimationFrame(animate.bind(this));
        if (!path[i]) {
          cancelAnimationFrame(timerId);
          throw `Can't get a point coordinate. Please check the coordinates`;
        }
        this.pathBuffer.push(path[i]);
        if (this.feetImage) {
          this.ctx.drawImage(this.feetImage, (path[i].y * this.zoom + this.canvasPosition.deltaX), (path[i].x * this.zoom + this.canvasPosition.deltaY), this.feetImage.width * this.zoom, this.feetImage.height * this.zoom);
        } else {
          this.ctx.fillRect((path[i].y * this.zoom + this.canvasPosition.deltaX), (path[i].x * this.zoom + this.canvasPosition.deltaY), this.print * this.zoom, this.print * this.zoom);
        }

        if (i + step >= path.length) {
          clearInterval(timerId);
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

          this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
          this.pathBuffer = [];
          i = 0;
          timerId = requestAnimationFrame(animate.bind(this));
        } else {
          i += step;
        }
      }, step / speed * 100);
    }

  }

  animatePathWithDrawing(path, speed = 50, step = 20, color = '#f00', printWeight = 3) {
    this.print = printWeight;
    this.ctx.fillStyle = color;
    animate.call(this);

    let i = 0;
    let timerId;

    function animate() {
      setTimeout(() => {
        timerId = requestAnimationFrame(animate.bind(this));
        if (!path[i]) {
          cancelAnimationFrame(timerId);
          throw `Can't get a point coordinate. Please check the coordinates`;
        }
        this.pathBuffer.push(path[i]);
        this.ctx.fillRect((path[i].y * this.zoom + this.canvasPosition.deltaX), (path[i].x * this.zoom + this.canvasPosition.deltaY), this.print * this.zoom, this.print * this.zoom);
        if (i + step >= path.length) {
          cancelAnimationFrame(timerId);
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.ctx.drawImage(this.image, this.canvasPosition.deltaX, this.canvasPosition.deltaY, this.initialImageWidth, this.newImageHeight);
          this.pathBuffer = [];
          i = 0;
          timerId = requestAnimationFrame(animate.bind(this));
        } else {
          i += step;
        }
      }, step / speed * 100);
    }
  }
}
