/*
   Copyright 2015 CLEARWAVE DESIGNS, LLC
   
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
   
          http://www.apache.org/licenses/LICENSE-2.0
   
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
    
   Author:        Adam Carson
   Website:       http://clearwavedesigns.com
   Dependencies:  None.
    
   Name(s):       Lazyload
   Version:       1.2.20151017
   Description:   This is an image, iframe & script lazy-loader. 663 bytes (minified). No dependencies. Preloading. Custom attribute/source reference.
 */
 
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
