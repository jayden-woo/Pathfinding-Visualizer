# Pathfinding Visualizer

- This project is inspired by [@DevonCrawford](https://github.com/DevonCrawford) and [@clementmihailescu](https://github.com/clementmihailescu) after coming across their YouTube videos ([Devon Crawford's video](https://www.youtube.com/watch?v=1-YPj5Vt0oQ) and [Clément Mihailescu's video](https://www.youtube.com/watch?v=n4t_-NjY_Sg)) on pathfinding visualization.
- The idea of visually seeing the algorithms execute makes it easier for me to understand and learn how each one of them works in detail and it's always amazing and satisfying to see them work in action.
- This is my version and attempt at creating a pathfinding visualization tool myself to revise on the pathfinding algorithms which were introduced in my university during my bachelor course and a chance to study some new maze generation algorithms as well.
- This project isn't perfect and is still a work-in-progress so feel free to give any feedback on how it can be improved on and I'll continue to put in more work during my free time.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Demo

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

- [x] Search Algorithms

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

- [x] [Maze Generation Algorithms](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Simple_algorithms)

  - [x] Basic Random Method
  - [x] [Recursive Backtracking Method](https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking)
  - [x] [Recursive Division Method](https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm)
  - [x] [Kruskal\'s Algorithm](https://weblog.jamisbuck.org/2011/1/3/maze-generation-kruskal-s-algorithm)
  - [x] [Prim\'s Algorithm](https://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm.html)

- [x] Other Features

  - [x] Restricting user inputs during different phase to avoid unintended interactions
  - [x] Pause and resume the visualization
  - [x] Custom visualization animation delay slider
  - [x] Legend for node colours meaning
  - [x] Real-time algorithm stats tracking (i.e. path length, number of nodes visited)
  - [x] Description and introduction for each algorithm
  - [x] Responsive interface

- [ ] Project Demonstration

  - [ ] Hosting the site using GitHub Pages
  - [ ] Add help page or description at the start on navigating the user interface
  - [ ] Add demo video in README.md

## Technology Stacks

- React for front end
- ReduxJS Toolkit for managing the application state
- NodeJS for backend functionality and package manager
- SASS for the node component (for more responsive user interactions with lesser delays) and base styling options
- Material UI (Core) for styling the other user interface elements and components
- ESLint for linting and detecting early bugs
- Prettier for enforcing a consistent style in the code base

## Installation & Available Scripts

Download or clone the repository to your local machine.

In the project directory, you can run:

### `npm install`

Installs the dependencies for the project to run the other scripts locally.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
