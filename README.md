# Mohamad Kaif Khan — Portfolio

Personal portfolio website: full stack developer, defence aspirant, and student.

## Structure

```
├── index.html        Main page (all sections: hero, about, skills, experience, projects, education, contact)
├── css/
│   └── style.css      All custom styles (Tailwind is loaded via CDN in index.html)
├── js/
│   └── script.js       Scroll reveal, typewriter effect, marquee, counters, contact form logic
└── assets/
    ├── profile.jpg      Profile photo shown in the hero section
    └── resume.pdf        Resume, linked from the "Download Resume" button
```

## Run locally

No build step needed — it's plain HTML/CSS/JS. Just open `index.html` in a browser,
or serve the folder with any static server, e.g.:

```bash
npx serve .
```

Note: the contact form (Formspree) won't deliver messages when opened directly as a
`file://` path — it only works once deployed to a real `https://` URL.

## Deploy on GitHub Pages

1. Push this folder to a new GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick the
   `main` branch and `/ (root)` folder, then **Save**.
4. Your site will be live in a minute or two at
   `https://<your-username>.github.io/<repo-name>/`.

Future edits (in `index.html`, `css/style.css`, or `js/script.js`) auto-deploy on every
push — no re-upload needed.

## Contact form

The contact form sends submissions to your inbox via
[Formspree](https://formspree.io). The endpoint is already set in `js/script.js`
(`CONTACT_FORM_ENDPOINT`). If you ever need to change the destination email, create a
new form at formspree.io and swap in the new endpoint ID there.
