const OL = require("./openlibrary");
const fs = require("fs");
const XML = require("xmlbuilder");

function _convert(data, pretty) {
  let contents = XML.create("package");
  contents.att("unique-identifier", "uuid_id")
  contents.att('xmlns', 'http://www.idpf.org/2007/opf')

  let metadata = contents.ele("metadata");
  metadata.att("xmlns:opf","http://www.idpf.org/2007/opf")
  metadata.att("xmlns:dc","http://purl.org/dc/elements/1.1/")

  for (let key in data.industryIdentifiers) {
    let d = data.industryIdentifiers[key];
    metadata.ele(
      "dc:identifier",
      { "opf:scheme": d["type"] },
      d["identifier"][0]
    );
  }

  for (let i in data.authors) {
    metadata.ele("dc:creator", { "opf:role": "aut" }, data.authors[i]);
  }

  metadata.ele("dc:title", { id: "title" }, data.title);

  if (undefined !== data.description) {
    metadata.ele("dc:title", { id: "subtitle" }, data.description);
    metadata.ele(
      "meta",
      { refines: "#subtitle", property: "title-type" },
      "subtitle"
    );
  }

  metadata.ele("dc:language", {}, data.language);
  metadata.ele("dc:publisher", {}, data.publisher);

  let date = new Date(Date.parse(data.publishedDate));

  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  let epubDate =
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate());

  metadata.ele("dc:date", {}, epubDate);


  if (undefined !== data.imageLinks.large) {
    metadata.ele("dc:identifier", { id: "cover-url" }, data.imageLinks.large);
  }

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
