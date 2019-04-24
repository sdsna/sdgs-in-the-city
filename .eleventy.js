
const { DateTime } = require('luxon');
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {

  // Config a collection for goals
  eleventyConfig.addCollection('goals', function(collection) {
    return collection.getFilteredByGlob('site/goals/*.md');
  });

  // Config a collection for projects
  eleventyConfig.addCollection('projects', function(collection) {
    return collection.getFilteredByGlob('site/projects/*.md');
  });

  // Config a collection for pages
  eleventyConfig.addCollection('sections', function(collection) {
    return collection.getFilteredByGlob('site/sections/*.md');
  });

  // Config for inline css + minification
  eleventyConfig.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Passthrough for Netlify CMS
  eleventyConfig.addPassthroughCopy("site/static/uploads");
  eleventyConfig.addPassthroughCopy("site/static/admin");

  return {
    pathPrefix: "/",
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    passthroughFileCopy: true,
    templateFormats: [ "md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };

};
