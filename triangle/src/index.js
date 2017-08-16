import Renderer from './Renderer';
import Shader from './Shader';
import Triangle from './Triangle';

const renderer = new Renderer;
const triangle = new Triangle(renderer.gl);
const shader = new Shader(renderer.gl);

const update = timestamp => {
  requestAnimationFrame(update);

  renderer.clear();
  triangle.draw(renderer.gl);
};

requestAnimationFrame(update);
