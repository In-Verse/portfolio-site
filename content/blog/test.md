---
title: This is the test markdown file
description: This is a test of rendering; it won't get published.
date: 2018-05-01
tags: markdown , draft
draft: true
---

# Heading 1

## Heading 2

### Heading 3

## References

Here is a statement that needs a citation[^1].

You can also use named footnotes[^note-name].

[^1]: This is the footnote content with source information.
[^note-name]: Named footnotes are easier to manage in long documents.

## Quotes

One line:

> Here is a quote

Two lines:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
> "Vivamus lacinia odio vitae vestibulum vestibulum."

Three lines:

> Here is a much longer
> quote that is still
> going on and on
> like here and there and everywhere like 
> mountains of thyme and parsnips

## Paragraphs and emphasis

Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.  
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- **Bold phrase**
- _Italic phrase_
- ~~Strikethrough~~

## Links and images

1. [Lorem Ipsum](https://www.lipsum.com)
2. [Nullam vitae](https://example.com)

![Placeholder image](https://via.placeholder.com/320x180 "Lorem ipsum image")

## Code blocks

``` bash
echo "Hello World!"
```

When you `blah blah blah blah code blah blah blah blah blah blah blah blah blah blah`
I always use this  `const x = "lorem";` when I ping computers around the block. It would be weird if you didn't! Again don't `echo` if you don't have to.


```js
function loremIpsum(x) {
  console.log("Lorem ipsum " + x);
  return x.split(" ").map(word => word.toUpperCase());
}
```

No code syntax highlighting

```
// Your command is my command
function myCommand() {
	let counter = 0;
	counter++;
}

console.log('Test');
```