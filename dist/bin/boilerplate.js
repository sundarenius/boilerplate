"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("source-map-support/register");
var main_1 = require("../src/main");
var arg = process.argv[2];
main_1.start(arg);
