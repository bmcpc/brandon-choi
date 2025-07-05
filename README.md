# Brandon Choi Website

A modern React + Vite website featuring an animated typewriter effect that cycles through different titles.

## Features

- **Typewriter Animation**: Dynamic text animation that cycles through multiple strings
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
The `TypeWriter` component creates a typing animation that cycles through an array of strings. It supports:
- Configurable typing speed
- Configurable deletion speed
- Configurable delay between strings
- Blinking cursor animation

**Usage:**
```jsx
<TypeWriter 
  strings={["Brandon Choi", "React Developer", "Full Stack Engineer"]} 
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
