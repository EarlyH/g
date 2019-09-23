import { expect } from 'chai';
import Canvas from '../../src/canvas';

const div = document.createElement('div');
document.body.appendChild(div);
div.id = 'c1';

describe('Canvas', () => {
  it('default renderer', () => {
    const canvas = new Canvas({
      container: div,
      width: 500,
      height: 500,
    });
    expect(Object.prototype.toString.call(canvas.get('el'))).eqls('[object HTMLCanvasElement]');
  });

  it('canvas renderer', () => {
    const canvas = new Canvas({
      renderer: 'canvas',
      container: div,
      width: 500,
      height: 500,
    });
    expect(Object.prototype.toString.call(canvas.get('el'))).eqls('[object HTMLCanvasElement]');
  });

  it('svg renderer', () => {
    const canvas = new Canvas({
      renderer: 'svg',
      container: div,
      width: 500,
      height: 500,
    });
    expect(Object.prototype.toString.call(canvas.get('el'))).eqls('[object SVGSVGElement]');
  });
});
