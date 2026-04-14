# Akash Kumar — SDE Portfolio

A modern personal portfolio built with React and Vite for an SDE internship aspirant. The site highlights a bold hero section, animated name reveal, project showcase, skills, DSA achievements, and contact information.

## Key Features

- Hero section with a visually rich 3D canvas and animated `Akash Kumar` headline
- `Kumar` appears letter-by-letter on page load and loops while staying on the page
- Five featured project cards, each with live demo and source links
- Sticky navigation with smooth section scrolling
- Custom cursor and interactive hover ring effects
- Responsive layout optimized for desktop and mobile
- Simple single-page routing using React Router DOM

## Tech Stack

- React 18
- Vite
- React Router DOM v6
- React Hot Toast
- Vanilla CSS animations

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/main.jsx` — application entry point and global providers
- `src/App.jsx` — top-level app shell and route definitions
- `src/layouts/MainLayout.jsx` — app layout, navbar, footer, custom cursor, and background animations
- `src/contexts/AppContext.jsx` — shared application state and scroll/mouse tracking
- `src/components/Hero.jsx` — animated hero section and 3D canvas visual
- `src/components/Projects.jsx` — featured project cards and project count display
- `src/components/About.jsx` — about section content
- `src/components/Skills.jsx` — skills and toolset section
- `src/components/DSA.jsx` — DSA and competitive programming highlight section
- `src/components/Contact.jsx` — contact section with links
- `src/lib/utils.js` — animation helpers, project data, skills data, and utility functions
- `src/styles/` — component-specific styling files

## Customization

To personalize the portfolio:

- Update hero text, copy, and image in `src/components/Hero.jsx`
- Change project details in `src/lib/utils.js`
- Modify skills and stats in `src/lib/utils.js`
- Edit section layout and text in their respective component files
- Adjust colors and animations in `src/styles/`

## Notes

- The project count is derived from the `projects` prop passed into `Projects`.
- The animation for `Kumar` is handled using state inside `Hero.jsx` and loops on the page.
- There are currently 5 featured projects displayed in the portfolio.

## License

This repository is for demo and portfolio use.
