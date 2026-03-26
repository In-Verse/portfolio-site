---
title: Posts
layout: layouts/blog.html
permalink: /posts/
eleventyNavigation:
  key: Posts
  order: 2
---

{% set postslist = collections.posts %}
{% include "layouts/postslist.njk" %}