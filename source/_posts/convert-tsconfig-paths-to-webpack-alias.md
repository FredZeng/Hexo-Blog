---
title: Convert TSConfig paths to Webpack alias
date: 2021-12-22
---

Inspired by [marzelin/convert-tsconfig-paths-to-webpack-aliases](https://github.com/marzelin/convert-tsconfig-paths-to-webpack-aliases).

```js
const fs = require('fs');
const path = require('path');
const get = require('lodash/get');
const JSON5 = require('json5');

/**
 * convert tsconfig.json paths to webpack alias
 */
const convertTSConfigPaths2Aliases = () => {
  const tsConfigPath = path.resolve(process.cwd(), './tsconfig.json');

  try {
    if (fs.existsSync(tsConfigPath)) {
      // dealing with json file with comments, we use json5 to parse tsconfig.json instead of requiring directly
      const tsConfig = JSON5.parse(fs.readFileSync(tsConfigPath));
      let { baseUrl, paths } = get(tsConfig, 'compilerOptions', {});

      if (paths) {
        baseUrl = baseUrl ? path.resolve(process.cwd(), baseUrl) : process.cwd();

        const replaceGlobs = (path) => path.replace(/(\/\*\*)*\/\*$/, '');

        return Object.keys(paths).reduce((aliases, pathName) => {
          const alias = replaceGlobs(pathName);
          const aliasPath = replaceGlobs(paths[pathName][0]);
          aliases[alias] = path.resolve(baseUrl, aliasPath);
          return aliases;
        }, {});
      }
    }
  } catch (err) {
    console.error(err);
    return {};
  }

  return {};
};
```

### Usage

```js
// webpack.js

module.exports = {
  resolve: {
    alias: {
      ...convertTSConfigPaths2Aliases(),
    }
  }
};
```
