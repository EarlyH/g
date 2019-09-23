import * as renderers from './renderers';

class MyCanvas {
  /**
   * 渲染器，默认是canvas
   * @type {String}
   */
  renderer: 'canvas';

  constructor({ renderer = 'canvas', ...rest }) {
    const { Canvas } = renderers[renderer];
    return new Canvas(rest);
  }
}

export default MyCanvas;
