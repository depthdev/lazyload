
function Lazyload(o) {
  // Elems (img,iframe,script)
  var e=(function(){var a=[],n=document.querySelectorAll('['+o.attr+']'),i=0,l=n.length;for(;i<l;i++){a[i]=n[i];}return a;})();
  // Viewport Height
  var v = innerHeight;
  // Pause
  var p = false;
  // Load
  var l = function() {
    for(var i=0,l=d.length;i<l;i++) {
      e[0].setAttribute('src',e[0].getAttribute(o.attr));
      e.shift(); // Remove t image from the array
    }
    r();
  };
  // Distances
  var d = [];
  // Reset
  var r = function() {
    d = []; // Reset distances for next set of images
    for (var i=0,l=e.length;i<l;i++) {
      // Parent Element (starting off with current element)
      var g = e[i];
      d[i] = 0;
      while (g) {
        d[i] += g.offsetTop;
        g = g.offsetParent;
      }
      if (i > 0 && d[i] > d[i-1]) {
        d.pop(); // Remove element if farther down the page and not side-by-side
        break;
      }
    }
    p = false;
  };
  // Init
  (function() {
    r();
    addEventListener('scroll', function() {
      if (!p && d[0] < v + o.preload + document.body.scrollTop) {
        p = true;
        l();
      }
    }.bind(this));
    dispatchEvent(new Event('scroll'));
    addEventListener('resize', function() {
      v = innerHeight;
    }.bind(this));
  }.bind(this))()
} // LAZYLOAD
