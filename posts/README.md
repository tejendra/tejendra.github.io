# Blog posts (Markdown)

Write posts here in **Markdown** (`.md`). They are loaded on the fly by `blog.html?post=slug`.

## Add a new post

1. Create `posts/your-slug.md`.
2. Add optional YAML frontmatter at the top:

    ```yaml
    ---
    title: "Your Post Title"
    date: 2025-03-09
    ---
    ```

3. Write the body in Markdown (headers, paragraphs, lists, links, **bold**, *italic*, etc.).
4. Open **`blog.html?post=your-slug`** in the browser (or link from `index.html`).

No build step required. The site fetches `posts/your-slug.md` and converts it to HTML in the browser using [marked](https://marked.js.org/).

## Run locally

```bash
npx live-server
```
