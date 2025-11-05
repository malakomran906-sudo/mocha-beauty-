# Mocha Beauty — Starter Site

This is a small, responsive static starter site for "Mocha Beauty" showcasing premium makeup products with a mocha-neutral palette and vibrant accent tones.

Preview locally:

```bash
# from workspace root
python3 -m http.server 8001 --directory mocha-beauty-site/src
# open http://localhost:8001
```

Files:
- `src/index.html` — main page
- `src/css/styles.css` — site styles
- `src/js/main.js` — product rendering and UI behavior
- `src/data/products.json` — sample product data

Deploy
------

This starter includes a GitHub Actions workflow (created automatically) to deploy the `mocha-beauty-site/src` folder to GitHub Pages (branch `gh-pages`). To enable deploys, push this repository to GitHub and ensure the Actions runner has access to `GITHUB_TOKEN` (default). The workflow deploys on push to `main`.

Local preview
-------------
Start a local server and open http://localhost:8001. The product list supports search, category filter, and a maximum price slider. Click "View" on a product to open a product modal.

Next steps:
- Add product images in `src/assets` and improve content.
- Configure GitHub Pages or CI deploy if desired.
