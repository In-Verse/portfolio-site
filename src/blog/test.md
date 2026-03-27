---
title: This is the test markdown file
description: This is a test of rendering; it won't get published.
date: 2018-05-01
tags:
  - markdown
  - test
  - draft
draft: true
---

# Heading 1
## Heading 2
### Heading 3

## References

Here is a statement that needs a citation.

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
- *Italic phrase*
- ~~Strikethrough~~

## Links and images

1. [Lorem Ipsum](https://www.lipsum.com)
2. [Nullam vitae](https://example.com)


![Placeholder frog detective](/assets/images/test.png "Frog detective")

## Code blocks

```bash
echo "Hello World!"
```

When you `blah blah blah blah code blah blah blah blah blah blah blah blah blah blah`
I always use this `const x = "lorem";` when I ping computers around the block.

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

A git diff

```diff-js
 // this is a command
 function myCommand() {
+  let counter = 0;
-  let counter = 1;
   counter++;
 }

 // Test with a line break above this line.
 console.log('Test');
```
