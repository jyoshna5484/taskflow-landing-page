# TaskFlow – SaaS Landing Page

A responsive landing page for **TaskFlow**, an invented task-management product for small teams.
Built for the Sankar Group front-end internship assignment.

## Features
- Sticky navbar with smooth-scrolling links and a mobile hamburger menu
- Hero with a working Kanban board: drag cards between columns, tap the arrow, add tasks; progress updates live
- Features, How it works (3 steps) and Pricing (3 plans) sections
- Pricing buttons scroll to the demo form and preselect the chosen plan
- Demo request form with validation (name, valid email, message) and a success message
- "Get Started" opens a sign-up popup (email + password validation, Esc to close)
- Monthly / yearly pricing toggle, FAQ accordion, testimonials, animated stats
- Nav highlights the current section; scroll progress bar; back-to-top button
- Dark mode (saved in the browser), team-size price estimator, scroll reveal animations
- Responsive layout for mobile, tablet and desktop; keyboard focus styles; reduced-motion support

## Technologies
HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript. No frameworks or build step.
Fonts: Sora and Inter (Google Fonts).

## Run locally
1. Download or clone this repository.
2. Open `index.html` in any browser. (No installation needed.)

Optional: `python -m http.server 8000` in the folder, then visit http://localhost:8000.

## Deploy
Drag the folder onto https://papaya-genie-5e1179.netlify.app , or enable GitHub Pages in the repository settings.

## Project structure
```
index.html   page structure and content
style.css    design tokens, layout, responsive rules
script.js    menu, task board, plan selection, form validation
```

## Design notes
(Add your 5–8 line explanation here.)
