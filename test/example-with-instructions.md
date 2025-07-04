---
title: "Example Document with Translation Instructions"
translator:
  instructions: >
    Use happy tone.
---

# Example Document

This is an example document that contains translation instructions in its frontmatter.

## Features

The translator script will now automatically detect and use the `translator.instructions` field from the document's frontmatter if no instructions are provided via parameters.

## Code Example

```javascript
// Shows a simple greeting in the console
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
```

This functionality makes it easier to have document-specific translation instructions without needing to pass them as parameters each time.
