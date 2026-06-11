# Ankit Kumar Portfolio

Static portfolio site for GitHub Pages.

## Local editing

The main files are:

- `index.html` for page content
- `styles.css` for layout and colors
- `script.js` for small interactions

## Git helper

This workspace already contains a read-only `.git` directory, so the real git data for
this project lives in `.git-data/`.

Use the helper script for git commands:

```bash
./repo-git.sh status
./repo-git.sh add .
./repo-git.sh commit -m "Update portfolio"
./repo-git.sh push
```

## Add project images or videos

Place media files inside `assets/projects/`.

Suggested pattern:

- `assets/projects/isaac-sim-demo.mp4`
- `assets/projects/drone-reconstruction-1.jpg`
- `assets/projects/vtol-sim.mp4`

Then replace a project header block in `index.html` with either:

```html
<video class="project-media-asset" controls preload="metadata">
  <source src="assets/projects/isaac-sim-demo.mp4" type="video/mp4" />
</video>
```

or:

```html
<img
  class="project-media-asset"
  src="assets/projects/drone-reconstruction-1.jpg"
  alt="3D reconstruction project preview"
/>
```

## GitHub Pages target

For a user site, create a repository named:

`ankit24079.github.io`

Then publish the contents of this folder to the `main` branch of that repository.

Your site URL will be:

`https://ankit24079.github.io`
