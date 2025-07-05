# Brandon Choi

A personal website.

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
- CSS3
- GitHub Actions
- GitHub Pages
