# A Little Encouragement

The live page displays only the supplied encouragement poster. The complete picture fits within the phone viewport without cropping. No JavaScript, forms, analytics, external fonts, or tracking are loaded.

## Run locally

Run `python -m http.server 4173 --directory dist` and open http://localhost:4173.

## Change the picture

Replace `dist/encouragement.jpeg`. Update the image dimensions and accessible alt text in `dist/index.html` if the replacement differs. The former quote files are retained as source assets but are not loaded by the page.

## Deploy

Publish the same ChatGPT Site identified in `.openai/hosting.json`, serving the tracked `dist` directory. No build or dependencies are required. Keep the production URL unchanged so the existing printed QR codes continue to work.
