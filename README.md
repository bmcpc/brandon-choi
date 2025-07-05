# Brandon Choi Website

A simple React + Vite website displaying "Brandon Choi" centered on the page.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bmcpc/BCWebsite.git
cd BCWebsite
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
4. The site will be available at: `https://bmcpc.github.io/BCWebsite/`

### Manual Build (for testing)
```bash
npm run build
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- React 19
- Vite 7
- CSS3
- GitHub Actions
- GitHub Pages

## Deployment Status

The deployment status can be monitored in the **Actions** tab of the GitHub repository.
