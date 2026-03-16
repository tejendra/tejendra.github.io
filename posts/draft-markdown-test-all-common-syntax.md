---
title: "Markdown test — all common syntax"
date: 2000-03-10
meta: Testing · Reference · Markdown
---

This is a **fake blog post** for testing. It contains all common Markdown syntax so you can verify styling on your site.

## Headings

Above is a level 2 heading. Below are levels 3 and 4.

### Level 3 heading

#### Level 4 heading

## Paragraphs and text

Plain paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Another paragraph with **bold**, *italic*, and ***bold italic*** text. You can also use `inline code` in the middle of a sentence.

Strikethrough: ~~deleted text~~.

---

## Links and images

An [internal link](/blog/3000-miles-on-the-east-coast-greenway/) and an [external link](https://example.com). Auto-links: <https://example.com>.

![Placeholder image](https://via.placeholder.com/600x200/f5f5f5/666?text=Image+placeholder)

---

## Lists

### Unordered

- First item
- Second item
  - Nested item
  - Another nested
- Third item

### Ordered

1. First step
2. Second step
3. Third step

### Task list (GFM)

- [x] Completed task
- [x] Another done item
- [ ] Unfinished task

---

## Blockquote

> This is a blockquote. It can span multiple lines. You can have several paragraphs inside a single blockquote.
>
> You can have several paragraphs inside a single blockquote.

---

## Code

Inline code: `const x = 42;`

Fenced code block (no language):

```
preformatted text
  with indentation
    preserved
```

Fenced with language:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
greet("World");
```

```css
.body {
  font-family: sans-serif;
  color: #333;
}
```

---

## Table

| Column A | Column B | Column C |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

---

## Horizontal rule

Three or more hyphens:

---

## Mixed content

A paragraph before a list.

- List item one
- List item two

A paragraph after. **Bold phrase** and *italic phrase* and a [link](https://example.com).

> A blockquote for good measure.

More text. `code`, **bold**, *italic*. The end.
