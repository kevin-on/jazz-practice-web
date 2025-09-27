# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Lint check**: `npm run lint:check`
- **Lint fix**: `npm run lint:fix`
- **Type check**: `npm run type:check`

## Project Architecture

This is a Next.js 14 jazz practice web application built with TypeScript, React, and Tailwind CSS. The app uses App Router (not Pages Router).

### Key Structure

- **App Router**: Uses Next.js App Router with `app/` directory structure
- **UI Components**: Built with Radix UI primitives and custom components in `components/ui/`
- **Styling**: Tailwind CSS with theme support (light/dark mode)
- **Type System**: Strong TypeScript types for music theory concepts in `types/`

### Music Theory Domain Model

The application revolves around jazz music practice with these core types:

- `MusicKey` - Musical keys (C, C#, D, etc.)
- `ChordType` - Chord types (major, minor, major7, dominant7, etc.)
- `Chord` - Combination of root key and chord type
- `Mode` - Musical modes
- `Scale` - Musical scales
- `Interval` - Musical intervals

### Application Structure

- **Landing Page**: `app/page.tsx` - Welcome page
- **Exercises Hub**: `app/exercises/page.tsx` - Lists available practice exercises
- **Exercise Pages**: `app/exercises/[exercise-name]/page.tsx` - Individual exercises
- **Shared Layout**: `app/exercises/layout.tsx` - Common layout for exercise pages

### Key Features

- **Random Chord Practice**: Generate random chords for practice with metronome support
- **Random Mode Practice**: Practice different musical modes
- **Audio Synthesis**: Uses Web Audio API for click sounds and metronome
- **Responsive Design**: Mobile-first with drawer navigation for mobile
- **Theme System**: Light/dark mode toggle with system preference detection

### Component Patterns

- UI components follow Radix UI patterns with forwardRef and className merging
- Uses `cn()` utility from `lib/utils.ts` for conditional class names
- Components are built with composition in mind using Radix primitives
- Mobile navigation uses drawer pattern with Vaul library

### State Management

- Local state with React hooks
- `useLocalStorageState` custom hook for persisting settings
- No global state management library (Redux/Zustand) currently used

### Audio Features

- `synth-click-service.ts` - Web Audio API wrapper for generating click sounds
- Metronome functionality integrated into practice exercises
- Uses oscillators and gain nodes for audio synthesis

### Testing Guidelines

- **Browser Testing**: When using Puppeteer for testing, always close browser sessions properly before ending the testing workflow

### Git Commit Guidelines

- **Commit Messages**: Never include references to "Claude Code" or AI assistance in commit messages. Keep commits professional and focused on the technical changes made.
- **File Exclusions**: Do not commit temporary or planning files such as:
  - Personal notes or scratch files
  - Any files with temporary or planning purposes that are not part of the application codebase
