
const { DateTime } = require('luxon');
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  eleventyConfig.setLibrary('md', markdownIt(options));

  // Config a collection for goals
  eleventyConfig.addCollection('goals', function(collection) {
    return collection.getFilteredByGlob('site/goals/*.md').sort(function(a, b) {
      return a.data.number - b.data.number;
    });
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

  // Add markdown filter for frontmatter
  eleventyConfig.addFilter('markdown', (string) => {
    var md = new markdownIt();
    return md.render(String(string));
  });

  // Passthrough for Netlify CMS
  eleventyConfig.addPassthroughCopy("site/static/uploads");
  eleventyConfig.addPassthroughCopy("site/admin");

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
