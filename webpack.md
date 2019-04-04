## Webpack

```js
let webpack = require('webpack');
module.exports = {
    entry: ["./app.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.js?$/, loaders: [], exclude: /node_modules/ },
        ]
    },
    watch: true
};
```

