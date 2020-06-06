import 'jest-canvas-mock';
import 'jsdom-global/register';
//import jsdom from 'jsdom';
import canvas from 'canvas';

//const canvas = require('canvas');

//const jsdom = require('jsdom');
//const document = jsdom.jsdom();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('', {url: "http://localhost"})).window;
global.document = document;
const window = document.defaultView;

const canvasMethods = ['HTMLCanvasElement'];

Object.keys(window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

canvasMethods.forEach(method =>
  global[method] = window[method]
);

global['CanvasRenderingContext2D'] = canvas.Context2d;

global.navigator = {
 userAgent: 'node.js'
};

global.fetch = require("node-fetch");

// browserMocks.js
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
