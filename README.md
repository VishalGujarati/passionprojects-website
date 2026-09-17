# Passion Projects website

Static website for Passion Projects.

## Local editing

Open the project folder in VS Code and use Live Server on `index.html`.

## Content

Public software and service data is kept in `data/site.json` so new entries can be added without rebuilding the page layout.

## Admin

`admin/` contains a local content editor for preparing `site.json`. It is intentionally not linked in the public navigation and is blocked from search indexing.

For a future online admin, use proper authentication and a server-side publishing flow. Never put a GitHub personal access token in client-side JavaScript.
