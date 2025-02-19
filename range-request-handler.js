importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Bring in workbox libs
const { registerRoute } = require('workbox-routing');
const { CacheFirst } = require('workbox-strategies');
const { RangeRequestsPlugin } = require('workbox-range-requests'); // The fix

// Add Range Request support to fetching videos from cache
registerRoute(
    /(\.webp$|\.jpg$)/,
    new CacheFirst({
        plugins: [
            new RangeRequestsPlugin(),
        ],
    })
);