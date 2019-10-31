const expect = require('chai').expect;
import Canvas from '../../src/canvas';
import { simulateMouseEvent, getClientPoint } from '../util';

const dom = document.createElement('div');
document.body.appendChild(dom);
dom.id = 'c1';

describe('#249', () => {
  const canvas = new Canvas({
    container: dom,
    width: 600,
    height: 600,
  });

  const el = canvas.get('el');

  it('eventObj of event delegation should be independent', () => {
    const group = canvas.addGroup({
      name: 'group',
    });
    const circle = group.addShape('circle', {
      name: 'circle',
      attrs: {
        x: 50,
        y: 50,
        r: 50,
        fill: 'red',
      },
    });

    const { clientX, clientY } = getClientPoint(canvas, 50, 50);
    let ev1;
    let ev2;

    canvas.on('group:click', (e) => {
      ev1 = e;
    });

    group.on('circle:click', (e) => {
      ev2 = e;
    });

    simulateMouseEvent(el, 'mousedown', {
      clientX,
      clientY,
    });

    simulateMouseEvent(el, 'mouseup', {
      clientX,
      clientY,
    });

    expect(ev1.target).eqls(circle);
    expect(ev1.currentTarget).eqls(group);
    expect(ev1.delegateTarget).eqls(canvas);
    expect(ev2.target).eqls(circle);
    expect(ev2.currentTarget).eqls(circle);
    expect(ev2.delegateTarget).eqls(group);
  });

  it('eventObj of event propagation should be independent', () => {
    const group = canvas.addGroup({
      name: 'group',
    });
    const circle = group.addShape('circle', {
      name: 'circle',
      attrs: {
        x: 50,
        y: 50,
        r: 50,
        fill: 'red',
      },
    });

    const { clientX, clientY } = getClientPoint(canvas, 50, 50);
    let ev1;
    let ev2;

    canvas.on('click', (e) => {
      ev1 = e;
    });

    group.on('click', (e) => {
      ev2 = e;
    });

    simulateMouseEvent(el, 'mousedown', {
      clientX,
      clientY,
    });

    simulateMouseEvent(el, 'mouseup', {
      clientX,
      clientY,
    });

    expect(ev1.target).eqls(circle);
    expect(ev1.currentTarget).eqls(canvas);
    expect(ev2.target).eqls(circle);
    expect(ev2.currentTarget).eqls(group);
  });
});
