# epub-metadata-generator

Generates a `metadata.xml` file for an EPUB from various online sources, given a few identifiers.

Currently supports the following providers:

|Provider|Input|
|--------|-----|
|OpenLibrary|ISBN|

## Installation

You can install it from NPM

```
npm i -g epub-metadata-generator
```

## Usage

You can use the provided command-line-executable:

```sh
generate-epub-xml 9780596101190 /tmp/9780596101190.xml
cat /tmp/9780596101190.xml
```

```xml
<?xml version="1.0"?>
<metadata>
  <dc:identifier opf:scheme="ISBN-13">9780596101190</dc:identifier>
  <dc:identifier opf:scheme="ISBN-10">0596101198</dc:identifier>
  <dc:creator opf:role="aut">Dan Woods</dc:creator>
  <dc:creator opf:role="aut">Gautam Guliani</dc:creator>
  <dc:title id="title">Open Source for the Enterprise</dc:title>
  <dc:title id="subtitle">Managing Risks, Reaping Rewards</dc:title>
  <meta refines="#subtitle" property="title-type">subtitle</meta>
  <dc:language>eng</dc:language>
  <dc:publisher>O'Reilly Media, Inc.</dc:publisher>
</metadata>
```

You can use this file in `pandoc` directly:

`pandoc input.html --epub-metadata=/tmp/9780596101190.xml file.epub`

Alternatively, you can use the NPM package programatically as well:

```javascript
const E = require('epub-metadata-generator')
E.write(filepath, ISBN);
```

## License

Licensed under the [MIT License](https://nemo.mit-license.org/). See LICENSE file for details.

## Credits

Some of the code in `openlibrary.js` is based on the [node-isbn-catalogue](https://www.npmjs.com/package/node-isbn-catalogue) package, which was based on [palmerabollo/node-isbn](https://github.com/palmerabollo/node-isbn). Both are under AGPL.
