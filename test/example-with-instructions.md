---
title: "Example Document with Translation Instructions"
translatorInstructions: "When translating this document, please use formal tone and prefer technical terminology over casual language. For code examples, preserve all variable names and function names in English, but translate code comments."
---

# Example Document

This is an example document that contains translation instructions in its frontmatter.

## Features

The translator script will now automatically detect and use the `translatorInstructions` or `translator_instructions` field from the document's frontmatter if no instructions are provided via parameters.

## Code Example

```javascript
// Shows a simple greeting in the console
function greetUser(name) {
    console.log(`Hello, ${name}!`);
}
```

This functionality makes it easier to have document-specific translation instructions without needing to pass them as parameters each time.
