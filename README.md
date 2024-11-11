# Braille Game

An interactive educational game built with Angular to help users learn and practice various STEM skills. The goal of the website and included games is to be as minimal as possible to focus on accessiblity and ease of use with a screen reader and/or connected braille display.

## Features

- Basic Math Game
  - Addition, subtraction, multiplication, and division practice
  - Randomized questions with appropriate difficulty levels
  - Immediate feedback on answers
  - Accessible interface
- Other games coming soon

## Accessing the Game

The game can be played online, deployed at [braille-reader-game.vercel.app](https://braille-reader-game.vercel.app/).

## Installation and Development

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Angular CLI (v18.2.0 or higher)

### Steps to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/dtsivkovski/braille-reader-game.git
cd braille-reader-game
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

4. Navigate to [localhost:4200](http://localhost:4200) to play

### Project Structure

- `src/app/` - Main application code
  - `basic-math/` - Basic math game component
  - `home/` - Home page component
  - `types/` - TypeScript interfaces and types
- `public/` - Static assets
- `src/styles.scss` - Global styles

