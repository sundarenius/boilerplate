"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var hello_1 = require("@/hello/hello");
var types_1 = require("@/types/types");
console.log(types_1.X);
hello_1.hello();
var start = function (arg) {
    console.log('start');
    console.log(arg);
};
exports.start = start;
