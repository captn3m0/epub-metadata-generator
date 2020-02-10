const generator = require("./index");

generator.write("/tmp/filename.xml", "0596101198");

test("the xml generator to work", () => {
  let input = {
    title: "Open Source for the Enterprise",
    publishedDate: "July 27, 2005",
    authors: ["Dan Woods", "Gautam Guliani"],
    description: "Managing Risks, Reaping Rewards",
    industryIdentifiers: [
      {
        type: "ISBN-13",
        identifier: ["9780596101190"]
      },
      {
        type: "ISBN-10",
        identifier: ["0596101198"]
      }
    ],
    pageCount: 234,
    printType: "BOOK",
    categories: [],
    imageLinks: {
      smallThumbnail: "https://covers.openlibrary.org/b/id/389214-S.jpg",
      thumbnail: "https://covers.openlibrary.org/b/id/389214-S.jpg"
    },
    previewLink:
      "https://openlibrary.org/books/OL7581318M/Open_Source_for_the_Enterprise",
    infoLink:
      "https://openlibrary.org/books/OL7581318M/Open_Source_for_the_Enterprise",
    publisher: "O'Reilly Media, Inc.",
    language: "eng"
  };
  let xml = generator._convert(input, false);
  expect(xml).toBe(
    `<?xml version="1.0"?><metadata><dc:identifier opf:scheme="ISBN-13">9780596101190</dc:identifier><dc:identifier opf:scheme="ISBN-10">0596101198</dc:identifier><dc:creator opf:role="aut">Dan Woods</dc:creator><dc:creator opf:role="aut">Gautam Guliani</dc:creator><dc:title id="title">Open Source for the Enterprise</dc:title><dc:title id="subtitle">Managing Risks, Reaping Rewards</dc:title><meta refines="#subtitle" property="title-type">subtitle</meta><dc:language>eng</dc:language><dc:publisher>O'Reilly Media, Inc.</dc:publisher></metadata>`
  );
});
