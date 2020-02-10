"use strict";

const https = require("https");

const OPENLIBRARY_API_BASE = "openlibrary.org";
const OPENLIBRARY_API_BOOK = "/api/books";

module.exports = {
  lookup: function(isbn, callback) {
    var standardize = function standardize(book) {
      var standardBook = {
        title: book.details.title,
        publishedDate: book.details.publish_date,
        authors: [],
        description: book.details.subtitle,
        industryIdentifiers: [],
        pageCount: book.details.number_of_pages,
        printType: "BOOK",
        categories: [],
        imageLinks: {
          smallThumbnail: book.thumbnail_url,
          thumbnail: book.thumbnail_url
        },
        previewLink: book.preview_url,
        infoLink: book.info_url
      };

      if (undefined !== book.details.isbn_13) {
        standardBook.industryIdentifiers.push({
          type: "ISBN-13",
          identifier: book.details.isbn_13
        });
      }
      if (undefined !== book.details.isbn_10) {
        standardBook.industryIdentifiers.push({
          type: "ISBN-10",
          identifier: book.details.isbn_10
        });
      }

      if (undefined !== book.details.goodreads) {
        standardBook.industryIdentifiers.push({
          type: "Goodreads",
          identifier: book.details.goodreads
        });
      }
      if (undefined !== book.details.librarything) {
        standardBook.industryIdentifiers.push({
          type: "LibraryThing",
          identifier: book.details.librarything
        });
      }

      if (book.details.publishers) {
        standardBook.publisher = book.details.publishers[0];
      } else {
        standardBook.publisher = "";
      }

      if (book.details.authors) {
        book.details.authors.forEach(function(author) {
          standardBook.authors.push(author.name);
        });
      }

      if (book.details.languages) {
        book.details.languages.forEach(function(language) {
          standardBook.language = language.key.replace("/languages/", "");
        });
      } else {
        standardBook.language = "unknown";
      }

      return standardBook;
    };

    var requestOptions = {
      host: OPENLIBRARY_API_BASE,
      path:
        OPENLIBRARY_API_BOOK +
        "?bibkeys=ISBN:" +
        isbn +
        "&format=json&jscmd=details"
    };

    var request = https.request(requestOptions, function(response) {
      if (response.statusCode !== 200) {
        return callback(
          new Error("wrong response code: " + response.statusCode)
        );
      }

      var body = "";
      response.on("data", function(chunk) {
        body += chunk;
      });

      response.on("end", function() {
        var books = JSON.parse(body);
        var book = books["ISBN:" + isbn];

        if (!book) {
          return callback(new Error("no books found with isbn: " + isbn));
        }

        return callback(null, standardize(book));
      });
    });

    request.on("error", function(err) {
      return callback(err);
    });

    request.end();
  }
};
