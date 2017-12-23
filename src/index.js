/* @flow */
import getFrameRenderer from "./can/frame-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";
import type {Drawable} from "./can/drawable";

import testSVG from "./svg/test.svg"

import cast from "./flo/cast";

const VIRT_WIDTH = 1200;
const VIRT_HEIGHT = 1200;


const fooLayer = cast(HTMLCanvasElement, document.getElementById("foo-layer"));
const barLayer = cast(HTMLCanvasElement, document.getElementById("bar-layer"));

const fooFrameRenderer = getFrameRenderer(fooLayer.getContext('2d'), fooLayer);
const barFrameRenderer = getFrameRenderer(barLayer.getContext('2d'), barLayer);

const eventListeners = getEventListeners();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barFrameRenderer.onResize,
  fooFrameRenderer.clear
  // force update drawables
));

eventListeners.add("click", (ev : Event, scale: number) => console.log((cast(MouseEvent, ev).clientX - cast(HTMLElement, ev.target).offsetLeft) / scale, ( cast(MouseEvent, ev).clientY - cast(HTMLElement, ev.target).offsetTop) / scale));



let upd = true;
let rot = 0;
eventListeners.add("resize", () => { upd = true});
const fooDrawables = [{
  updated: () => true,
  draw: (ctx, scale) => {
    ctx.save();
    ctx.translate(500 * scale, 500 * scale);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.rotate(rot);
    ctx.translate(-500, -500);
    //$FlowFixMe
    testSVG(ctx);
    ctx.restore();
    ctx.restore();
    upd = false;
  },
  clear: (ctx, scale) => { ctx.clearRect(0,0, 1200*scale, 1200*scale)},
}];



let rendering = false;
const renderLoop = () => {
  rot += 0.03;
  if (!rendering) {
    rendering = true;
    fooFrameRenderer.render(fooDrawables);
    barFrameRenderer.render([/*drawables*/]);
    rendering = false;
  }
  requestAnimationFrame(renderLoop);
}
renderLoop();
