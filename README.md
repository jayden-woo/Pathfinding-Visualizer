<h1 align="center">
  <br>
  <a href="https://jayden-woo.github.io/pathfinding-visualizer/"><img src="https://raw.githubusercontent.com/jayden-woo/pathfinding-visualizer/master/public/logo512.png" alt="logo" title="Pathfinding Visualizer" width="200"></a>
  <br>
  Pathfinding Visualizer
  <br>
</h1>

<h4 align="center">A pathfinding and maze generation algorithms visualizer built using <a href="https://react.dev/" target="_blank">React</a>.</h4>

<p align="center">
  <a href="https://nodejs.org/en" target="_blank"><img alt="NodeJS" src="https://img.shields.io/badge/NodeJS-13-gray?style=flat&logo=node.js&logoColor=white&labelColor=6DA55F"></a>
  <a href="https://react.dev/" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
  <a href="https://redux.js.org/" target="_blank"><img alt="Redux" src="https://img.shields.io/badge/Redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
  <a href="https://mui.com/" target="_blank"><img alt="MUI" src="https://img.shields.io/badge/MUI-%230081CB.svg?style=flat&logo=mui&logoColor=white"></a>
  <a href="https://pages.github.com/" target="_blank"><img alt="Github Pages" src="https://img.shields.io/badge/Github%20Pages-121013?style=flat&logo=github&logoColor=white"></a>
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#technology-stacks">Tech Stacks</a> •
  <a href="#installation">Installation</a> •
  <a href="#building-for-production">Production</a> •
  <a href="#license">License</a>
</p>

<div align="center">
  <img alt="Screenshot" src="https://raw.githubusercontent.com/jayden-woo/pathfinding-visualizer/master/screenshot.png">
  :construction: <sub>Work in Progress (WIP)</sub>
</div>

## Introduction

- This project is inspired by [@DevonCrawford](https://github.com/DevonCrawford) and [@clementmihailescu](https://github.com/clementmihailescu) after coming across their YouTube videos ([Devon Crawford's video](https://www.youtube.com/watch?v=1-YPj5Vt0oQ) and [Clément Mihailescu's video](https://www.youtube.com/watch?v=n4t_-NjY_Sg)) on pathfinding visualization.
- The idea of visually seeing the algorithms execute makes it easier for me to understand and learn how each one of them works in detail and it's always amazing and satisfying to see them work in action.
- This is my version and attempt at creating a pathfinding visualization tool myself to revise on the pathfinding algorithms which were introduced in my university during my bachelor course and a chance to study some new maze generation algorithms as well.
- This project isn't perfect by any means and is still a work-in-progress so feel free to give any feedback on how it can be improved on and I'll continue to put in more work during my free time.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Demo

[Check out the Algorithm Visualizer live in action here.](https://jayden-woo.github.io/pathfinding-visualizer/)

<video src="https://user-images.githubusercontent.com/80225713/218802005-2437a1cd-9815-4298-95c7-f72f53cfd93c.mov"></video>

## Features

- [x] 2D Square Grid

  - [x] Draw own wall nodes with mouse
  - [x] Drag the source and target nodes around
  - [x] Responsive Grid
  - [x] Traverse 4-directionally
  - [x] Traverse diagonally
  - [x] Clear path only or whole board after visualization or while pausing
  - [x] Show the search frontier separately from the visited nodes
  - [x] Instant path updates when changing configurations after visualizing
  - [ ] Add lines to clearly indicate path taken

- [x] [Search Algorithms](https://en.wikipedia.org/wiki/Pathfinding)

  - [x] Depth-First Search
  - [x] Breadth-First Search
  - [x] Greedy Best-First Search
  - [x] A\* Algorithm - [Heuristics](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)
    - [x] Manhattan Distance
    - [x] Euclidean Distance
    - [x] Chebyshev Distance
    - [x] Octile Distance
  - [x] Dijkstra\'s Algorithm
  - [ ] Jump Point Search

- [x] [Maze Generation Algorithms](https://en.wikipedia.org/wiki/Maze_generation_algorithm)

  - [x] Basic Random Method
  - [x] [Recursive Backtracking Method](https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking)
  - [x] [Recursive Division Method](https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm)
  - [x] [Kruskal\'s Algorithm](https://weblog.jamisbuck.org/2011/1/3/maze-generation-kruskal-s-algorithm)
  - [x] [Prim\'s Algorithm](https://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm.html)
  - [ ] Aldous-Border Algorithm
  - [ ] Growing Tree Algorithm
  - [ ] Hunt-and-Kill Algorithm
  - [ ] Wilson's Algorithm
  - [ ] Eller's Algorithm
  - [ ] Sidewinder Algorithm
  - [ ] Binary Tree Algorithm

- [x] Other Features

  - [x] Restrict user inputs during different phase to avoid unintended interactions
  - [x] Pause and resume the visualization
  - [x] Skip animation entirely to only view the end results
  - [x] Custom visualization animation delay slider
  - [x] Legend for node colours meaning
  - [x] Real-time algorithm stats (i.e. execution time, number of nodes visited, path length)
  - [x] Description for each algorithm including both search and maze generation
  - [x] Responsive interface (Breakpoints tested at width of 425px, 758px, 1024px, 1440px, 2560px)

- [x] Project Demonstration and Setup
  - [x] Hosting the site using GitHub Pages
  - [x] Add help page or description at the start on navigating the user interface
    - [x] Use gif for further clarification made using [ezgif](https://ezgif.com)
  - [x] Add github logo and link to repository in web app.
  - [x] Add demo video in README.md
  - [x] Add link to web app in README.md
  - [x] Add LICENSE.md

## Technology Stacks

- React for front end
- ReduxJS Toolkit for managing the application state
- NodeJS for backend functionality and package manager
- SASS for the node component (for more responsive user interactions with lesser delays) and base styling options
- Material UI (Core) for styling the other user interface elements and components
- ESLint for linting and detecting early bugs
- Prettier for enforcing a consistent style in the code base

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

From your command line:

1. Install and use the correct version of Node (^13.14.0) using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install 13
   ```

2. Clone this repository

   ```sh
   git clone https://github.com/jayden-woo/pathfinding-visualizer
   ```

3. Navigate into the project directory

   ```sh
   cd pathfinding-visualizer
   ```

4. Install dependencies

   ```sh
   npm install
   ```

5. Start the development server

   ```sh
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Building for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

2. Preview the site as it will appear once deployed using [serve](https://github.com/vercel/serve)

   ```sh
   npx serve -s build
   ```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
