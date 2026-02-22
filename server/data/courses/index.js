const algoCourses = require("./algo");
const cCourses = require("./c");
const bashCourses = require("./bash");

const allCourses = [
    ...algoCourses,
    ...cCourses,
    ...bashCourses
];

module.exports = allCourses;
