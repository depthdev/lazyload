# Lazyload
Image, Iframe &#38; Script Lazy-loader

<ul>
  <li>1.08 KB minified</li>
  <li>No dependencies</li>
  <li>Preloading</li>
  <li>Custom attribute/source reference</li>
  <li>Strict mode supported</li>
</ul>

<p>Use:</p>
<pre>
new Lazyload({
  attr: 'data-src', // Required. Full attribute name. This doubles as the selector AND source for the src attribute.
  preload: 500 // Required. The distance in pixels from the bottom of the viewport to start loading the next elements src.
});
</pre>
