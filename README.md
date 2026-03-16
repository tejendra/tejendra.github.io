# Blog posts (Markdown)

Write posts here in **Markdown** (`.md`). Each post is built as a static HTML page at `blog/<slug>/` for clean, shareable URLs.

## Add a new post

1. Create `posts/your-slug.md`.
2. Add optional YAML frontmatter at the top:

    ```yaml
    ---
    title: "Your Post Title"
    date: 2025-03-09
    category: project   # optional: use "project" to list under Projects on the home page
    description: Content that gets added to <meta name="description">
    keywords: Content that gets added to <meta name="keywords">
    ---
    ```

3. Write the body in Markdown (headers, paragraphs, lists, links, **bold**, *italic*, etc.).
4. Run the build — the post is added to the home page list automatically (Recent musings or Projects if `category: project`).

    ```bash
    npm run build
    ```

Your post will be at **`blog/your-slug/`** (e.g. `https://yoursite.github.io/blog/your-slug/`).

## Build

From the project root:

```bash
npm install
npm run build
```

This generates the `blog/` folder (one `blog/<slug>/index.html` per post), the `/blog` redirect, and updates the home page lists in `index.html` from `index-source.html`. Posts with `category: project` appear under Projects; all others under Recent musings. Any file whose slug starts with `draft-` or is `readme` is excluded from the home page list.

## Run locally

```bash
npx live-server
```

Serve after running `npm run build` so the `blog/` pages exist.
