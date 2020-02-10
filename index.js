const OL = require("./openlibrary");
const fs = require("fs");
const XML = require("xmlbuilder");

function _convert(data, pretty) {
  let contents = XML.create("metadata", {
    "xmlns:dc": "http://purl.org/dc/elements/1.1/"
  });
  for (let key in data.industryIdentifiers) {
    let d = data.industryIdentifiers[key];
    contents.ele(
      "dc:identifier",
      { "opf:scheme": d["type"] },
      d["identifier"][0]
    );
  }

  for (let i in data.authors) {
    contents.ele("dc:creator", { "opf:role": "aut" }, data.authors[i]);
  }

  contents.ele("dc:title", { id: "title" }, data.title);
  contents.ele("dc:title", { id: "subtitle" }, data.description);
  contents.ele(
    "meta",
    { refines: "#subtitle", property: "title-type" },
    "subtitle"
  );

  contents.ele("dc:language", {}, data.language);
  contents.ele("dc:publisher", {}, data.publisher);

  let blob = contents.end({ pretty: pretty });
  return blob;
}

module.exports = {
  write: function(filepath, isbn) {
    OL.lookup(isbn, function(err, data) {
      fs.writeFileSync(filepath, _convert(data, true));
    });
  },
  _convert: _convert
};
