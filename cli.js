#!/usr/bin/env node
const generator = require("./index");

let ISBN = process.argv[2];
let filepath = process.argv[3];

generator.write(filepath, ISBN);
