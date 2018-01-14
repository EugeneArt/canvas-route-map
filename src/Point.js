export default class Point {
  constructor(image, width, height) {
    this.image = image;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width || this.image.width;
    this.canvas.height = height || this.image.height;
  }

  getPoint() {
    this.canvas
        .getContext('2d')
        .drawImage(
            this.image,
            0,
            0,
            this.canvas.width,
            this.canvas.height);
    return this.canvas;
  }
}