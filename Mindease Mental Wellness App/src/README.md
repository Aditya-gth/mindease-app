# Mindease - Mental Wellness Companion

A comprehensive mental wellness app designed to help users manage stress and improve their mental health through guided meditations, breathing exercises, mood tracking, and AI companion support.

## Features

- **Home Dashboard** - Quick access to wellness tools and daily affirmations
- **Discover Library** - Guided meditations, journaling prompts, and breathing exercises
- **Check-In System** - Mood tracking with optional journal entries
- **Exercise Library** - Box breathing and mindfulness exercises with visual cues
- **Profile & Progress** - User wellness stats and progress tracking
- **AI Companion** - Contextual chatbot for mental health support and daily conversations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Deploy automatically

### Option 2: Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to [Netlify](https://netlify.com)
3. Or connect your GitHub repo for automatic deployments

### Option 3: Traditional Hosting
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your server to serve `index.html` for all routes

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## Privacy & Data

This app stores user data locally in the browser for privacy. No personal information is sent to external servers.

## License

This project is available for personal and commercial use.

## Support

For issues or questions about deployment, please refer to the documentation of your chosen hosting platform.