const algoCourses = require("./algo");
const cCourses = require("./c");
const pythonCourses = require("./python");
const cppCourses = require("./cpp");
const htmlCourses = require("./html");
const cssCourses = require("./css");
const bashCourses = require("./bash");
const jsCourses = require("./js");
const phpCourses = require("./php");
const mongodbCourses = require("./mongodb");
const mysqlCourses = require("./mysql");
const reactCourses = require("./react");

const allCourses = [
    ...algoCourses,
    ...cCourses,
    ...pythonCourses,
    ...cppCourses,
    ...htmlCourses,
    ...cssCourses,
    ...bashCourses,
    ...jsCourses,
    ...phpCourses,
    ...mongodbCourses,
    ...mysqlCourses,
    ...reactCourses
];

module.exports = allCourses;
