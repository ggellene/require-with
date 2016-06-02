# Require-with

Dependency injection for node.js

## Installation

```
npm install --save require-with
```

## Usage

```javascript
var requireWith = require('require-with');
var mockFancify = requireWith('./fancifier', { 'leftpad': function(a){return a} });

expect(mockFancify(something)).toBeFancy();
expect(mockFancify(something)).not.toBeLeftpadded();
```