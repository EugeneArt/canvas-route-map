export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}
