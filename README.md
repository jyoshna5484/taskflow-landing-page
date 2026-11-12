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
I built TaskFlow, a task manager for small teams, as a single-page site using plain HTML, CSS and JavaScript with no frameworks. I chose a green and dark-navy palette with the Sora and Inter fonts for a clean, professional look, and used CSS variables so colors, spacing and dark mode stay consistent. Instead of a stock image, the hero has a working Kanban board where visitors can drag tasks between columns and add their own, which shows the product idea straight away. The layout uses CSS Grid and media queries to move from four columns on desktop to one on mobile, with a hamburger menu. The demo form and sign-up popup validate each field and show clear error and success messages. One challenge was making drag and drop work on phones, where it is unreliable, so I added a tap-the-arrow button to each card. Another was keeping dark mode readable, which I solved by replacing hard-coded colors with theme variables.
