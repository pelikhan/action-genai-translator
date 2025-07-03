# Comprehensive Markdown Syntax Guide

This document demonstrates all the major syntactic constructs available in Markdown.

## Table of Contents

- [Headers](#headers)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Links and Images](#links-and-images)
- [Code](#code)
- [Tables](#tables)
- [Blockquotes](#blockquotes)
- [Horizontal Rules](#horizontal-rules)
- [Line Breaks](#line-breaks)
- [HTML Elements](#html-elements)
- [Advanced Features](#advanced-features)

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

Alternative H1
==============

Alternative H2
--------------

## Text Formatting

**Bold text using asterisks**
__Bold text using underscores__

*Italic text using asterisks*
_Italic text using underscores_

***Bold and italic using asterisks***
___Bold and italic using underscores___

~~Strikethrough text~~

`Inline code`

Regular text with **bold**, *italic*, and `code` mixed together.

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item 2.2.1
- Item 3

Alternative syntax:
* Item A
* Item B
  * Nested item B.1
  * Nested item B.2

Another alternative:
+ Item X
+ Item Y
  + Nested item Y.1

### Ordered Lists

1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
      1. Deeply nested item
3. Third item

Alternative numbering:
1. Item one
1. Item two (auto-numbered)
1. Item three (auto-numbered)

### Mixed Lists

1. Ordered item
   - Unordered nested item
   - Another unordered nested item
2. Another ordered item
   1. Nested ordered item
   2. Another nested ordered item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
  - [x] Nested completed task
  - [ ] Nested incomplete task

## Links and Images

### Links

[Simple link](https://www.example.com)

[Link with title](https://www.example.com "Example Website")

// TODO turn off MDX
< https://www.autolink.com>

[Reference link][ref1]

[Another reference link][ref2]

[Case-insensitive reference link][REF1]

You can also link to [local files](./README.md).

### Images

![Alt text](https://via.placeholder.com/150x100 "Image title")

![Reference image][img1]

### Reference Definitions

[ref1]: https://www.reference1.com "Reference 1 Title"
[ref2]: https://www.reference2.com
[img1]: https://via.placeholder.com/200x150 "Reference Image"

## Code

### Inline Code

Use `console.log()` to print to the console.

### Code Blocks

```
Simple code block without syntax highlighting
```

```javascript
// JavaScript code block
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python code block
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```bash
# Bash script
#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
    echo "Number: $i"
done
```

```json
{
    "name": "Sample JSON",
    "version": "1.0.0",
    "dependencies": {
        "express": "^4.18.0"
    }
}
```

Indented code block (4 spaces):
TODO: fix this parse issue
## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More data|
| Row 2    | Info     | Details  |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
| More         | Data           | Here          |

### Simple Table

First Header | Second Header
------------ | -------------
Content cell 1 | Content cell 2
Content cell 3 | Content cell 4

## Blockquotes

> This is a simple blockquote.

> This is a blockquote
> that spans multiple lines.

> Nested blockquotes:
>
> > This is a nested blockquote.
> > 
> > > And this is deeply nested.

> ### Blockquote with other elements
> 
> - List item in blockquote
> - Another item
> 
> **Bold text** in blockquote with `inline code`.

## Horizontal Rules

---

***

___

- - -

* * *

_ _ _

## Line Breaks

This is the first line.  
This is the second line (two spaces at end of previous line).

This is the third line.

This is the fourth line (empty line creates paragraph break).

This is a line with a\
backslash line break.

## HTML Elements

You can use <em>HTML tags</em> in Markdown.

<strong>Bold using HTML</strong>

<code>Inline code using HTML</code>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Highlighted text</mark>

<small>Small text</small>

<sub>Subscript</sub> and <sup>Superscript</sup>

<details>
<summary>Expandable section</summary>

This content is hidden by default and can be expanded.

- List item
- Another item

```javascript
console.log("Code in details");
```

</details>

## Advanced Features

### Footnotes

Here's a sentence with a footnote[^1].

Another sentence with a footnote[^note].

[^1]: This is the first footnote.
[^note]: This is a named footnote with more details.

### Definition Lists

Term 1
:   Definition for term 1

Term 2
:   Definition for term 2
:   Another definition for term 2

### Abbreviations

*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheets

HTML and CSS are important web technologies.

### Mathematics (if supported)

Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Escape Characters

Use backslashes to escape special characters:

\*Not italic\*
\#Not a header
\[Not a link\]
\`Not code\`

### Comments

TODO: Need to be able to turn off MDX.

### Emojis

:smile: :heart: :thumbsup: :rocket: :computer:

😀 😍 👍 🚀 💻

---

## Conclusion

This document covers most of the standard Markdown syntax. Some features like footnotes, definition lists, mathematics, and certain HTML elements may not be supported in all Markdown processors, but they work in many extended versions like GitHub Flavored Markdown (GFM), CommonMark, and others.

**Note**: The exact rendering of these elements may vary depending on the Markdown processor being used.
