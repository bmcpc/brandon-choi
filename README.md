# Brandon Choi Website

A modern React + Vite website featuring an animated typewriter effect that cycles through different titles.

## Features

- **Typewriter Animation**: Dynamic text animation that cycles through multiple strings
- **Smart Diffing**: Intelligent transitions that only change differing parts between similar strings
- **Solarized Color Scheme**: Beautiful off-white text with solarized dark gradient background
- **Responsive Design**: Centered layout that works on all screen sizes
- **Interactive Tech Icons**: Hover effects and animations for Vite and React logos
- **Automatic Deployment**: GitHub Actions integration for seamless deployment

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bmcpc/brandon-choi.git
cd brandon-choi
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## Components

### TypeWriter Component
The `TypeWriter` component creates a typing animation that cycles through an array of strings. It features:
- **Smart Diffing**: When transitioning between similar strings, only changes the differing parts
- **Configurable typing speed**: Control how fast characters are typed
- **Configurable deletion speed**: Control how fast characters are deleted
- **Configurable delay between strings**: Control pause time between transitions
- **Blinking cursor animation**: Realistic cursor blinking effect

**Smart Diffing Example:**
- When transitioning from "Software Engineer" to "Backend Engineer"
- Only "Software" gets deleted and replaced with "Backend"
- The common " Engineer" part remains unchanged
- This creates smoother, more intelligent transitions

**Current Implementation:**
- **Prominent Static Title**: Large "Brandon Choi" title always visible at the top
- **Dynamic Role Display**: Typewriter effect cycles through professional roles below the title
- **Clear Visual Hierarchy**: Title is larger (4.5rem) than typewriter text (2.5rem)

**Current Strings:**
- "Software Engineer" 
- "Backend Engineer"
- "React Developer"
- "Full Stack Engineer"

**Usage:**
```jsx
<h1>Brandon Choi</h1>
<TypeWriter 
  strings={["Software Engineer", "Backend Engineer", "React Developer"]} 
  speed={100} 
  deleteSpeed={50} 
  delayBetweenStrings={1500} 
/>
```

### Title Component
The `Title` component dynamically sets the document title (browser tab title) for SEO and user experience.

## Deployment to GitHub Pages

This project automatically deploys to GitHub Pages using GitHub Actions.

### Automatic Deployment
- Every push to the `master` branch triggers the deployment workflow
- GitHub Actions will automatically build and deploy the site
- No manual deployment commands needed!

### Setup GitHub Pages (One-time setup)
1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The site will be available at: `https://bmcpc.github.io/brandon-choi/`

### Manual Build (for testing)
```bash
npm run build
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- React 19
- Vite 7
- CSS3 (with animations)
- GitHub Actions
- GitHub Pages

## Deployment Status

The deployment status can be monitored in the **Actions** tab of the GitHub repository.
