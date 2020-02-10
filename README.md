# epub-metadata-generator

Generates a `metadata.xml` file for an EPUB from various online sources, given a few identifiers.

Currently supports the following:

|Provider|Input|
|--------|-----|
|OpenLibrary|ISBN|

## Usage

```javascript
const E = require('epub-metadata-generator')
E.write(filepath, ISBN);
```

## License

Licensed under the [MIT License](https://nemo.mit-license.org/). See LICENSE file for details.

## Credits

Some of the code in `openlibrary.js` is based on the [node-isbn-catalogue](https://www.npmjs.com/package/node-isbn-catalogue) package, which was based on [palmerabollo/node-isbn](https://github.com/palmerabollo/node-isbn). Both are under AGPL.
