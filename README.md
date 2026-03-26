# Computer Poetry portfolio website

## About

This is the personal portfolio site for [computerpoetry.com](https://computerpoetry.com) styled with Dracula color theme and using the [Annotation Mono](https://github.com/qwerasd205/AnnotationMono) font.

Eleventy is a static site generator. This site is a fork of the official [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog). Overall, the site is a more minimal version using less plugins and dependencies.

## To serve 

```
git clone git@github.com:In-Verse/portfolio-site.git
cd portfolio-site
npm install
npm start
```

The output is written in `/dist`. You can host on your choice of provider.

## Changes to the fork

- Different file organization structure
- Less plugins
  - Syntax highlighting
  - Image optimization
  - Luxon for filters
- CSS
  - Terminal interface (TUI) inspired layout
  - Annotation Mono variable font
  - Use the Dracula colorscheme with a full token palette
  - Plaintext and inline code syntax highlighting
  - Quote styling