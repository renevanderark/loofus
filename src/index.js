/* @flow */
import cast from "flo-cast";
import MusicalScore from "musical-score";

import { getFrameRenderer, getResizeListeners, initViewPort, getEventListeners } from "./can";
import testSVG from "./svg/test.svg"



const VIRT_WIDTH = 1000;
const VIRT_HEIGHT = 1000;

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
    ctx.scale(rot/4, rot/4);
    ctx.translate(500 * scale, 500 * scale);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.rotate(rot);
    ctx.translate(-500, -500);
    //$FlowFixMe
    testSVG(ctx, {color: "#00ff00"});
    ctx.restore();
    ctx.restore();
    upd = false;
  },
  clear: (ctx, scale) => { ctx.clearRect(0,0, 1000*scale, 1000*scale)},
}];

const music = new MusicalScore("https://renevanderark.github.io/arkaic/out/");
music.addTrack('string', 'C4h D4h');
music.addTrack('horn', 'C2i C2i C2i D2s E2s C2i C2i C2i C2i');
music.play(true);

setTimeout(() => music.stop(), 1000);

let rendering = false;
const renderLoop = () => {
  rot += 0.03;
  if (rot >= 3*Math.PI) { rot = 0; }
  if (!rendering) {
    rendering = true;
    fooFrameRenderer.render(fooDrawables);
    barFrameRenderer.render([/*drawables*/]);
    rendering = false;
  }
  requestAnimationFrame(renderLoop);
}
renderLoop();
