/*
 Lazyload v1.3.0
 (c) 2015 Clearwave Designs, LLC. http://clearwavedesigns.com
 License: Apache 2.0
*/

// a = array
// d = distances (from top)
// e = elements
// g = grandparent (parent element)
// n = node list
// o = options object
// p = pause
// r = reset
// s = set
// t = top
// v = viewport height

'use strict';

function Lazyload(o) {
  // Elems (img,iframe,script)
  var e = (function () {
    var a = [],
    n = document.querySelectorAll('[' + o.attr + ']'),
    i = 0,
    l = n.length;for (; i < l; i++) {
      a[i] = n[i];
    }return a;
  }());
  // Viewport Height
  var v = innerHeight;
  // Pause
  var p = false;
  // Set
  var s = function() {
    for (var i = 0, l = d.length; i < l; i++) {
      e[0].setAttribute('src', e[0].getAttribute(o.attr));
      e.shift(); // Remove t image from the array
    }
    r();
  };
  // Distances
  var d = [];
  // Top
  var t = function(e) {
    var g = e,
    c = 0;
    while (g) {
      c += g.offsetTop;
      g = g.offsetParent;
    }
    return c;
  };
  // Reset
  var r = function() {
    d = []; // Reset distances for next set of images
    for (var i = 0, l = e.length; i < l; i++) {
      // Parent Element (starting off with current element)
      d[i] = t(e[i]);
      // Remove element if farther down the page and not side-by-side and exit
      if (i > 0 && d[i] > d[i - 1]) {
        d.pop();
        break;
      }
    }
    p = false;
  };
  // Init
  (function () {
    r();
    addEventListener('scroll', function () {
      if (!p && d[0] < v + o.preload + document.body.scrollTop) {
        p = true;
        s();
      }
    }.bind(this));
    addEventListener('load', function() {
      // setTimeout is used because document.body.scrollTop is inaccurate onload
      setTimeout(function() {
        var scrolled = v + o.preload + document.body.scrollTop;
        for (var i = 0, l = e.length; i < l; i++) {
          d[i] = t(e[i]);
          if (d[i] > scrolled) {
            d.pop();
            break;
          }
        }
        s();
      }.bind(this), 0);
    }.bind(this));
    addEventListener('resize', function () {
      v = innerHeight;
    }.bind(this));
  }.bind(this)());
} // LAZYLOAD
