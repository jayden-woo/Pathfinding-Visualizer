# Pathfinding Visualizer

- This project is inspired by [@clementmihailescu](https://github.com/clementmihailescu) and [@DevonCrawford](https://github.com/DevonCrawford).
- The idea of visually seeing the algorithms execute makes it easier for me to understand and learn how each one of them works in details and it's always amazing and satisfying to see them work in action.
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
  - [x] Clear path & board after visualization or while pausing
  - [ ] Add lines to clearly indicate path taken

- [x] Search Algorithms

  - [x] Depth-First Search
  - [x] Breadth-First Search
  - [ ] Greedy Best-First Search
  - [x] A\* Algorithm - [Heuristics](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)
    - [x] Manhattan Distance
    - [ ] Euclidean Distance
    - [ ] Chebyshev Distance
    - [ ] Octile Distance
  - [ ] Dijkstra\'s Algorithm
  - [ ] Jump Point Search

- [ ] Maze Generation Algorithms

  - [ ] Basic Random Method
  - [ ] Recursive Division Method
  - [ ] Prim\'s Algorithm

- [x] Other Features

  - [x] Pause and resume the visualization
  - [x] Custom visualization animation delay slider
  - [x] Algorithm stats tracking (i.e. path length, number of nodes visited)
  - [x] Description and introduction for each algorithm
  - [ ] Responsive interface

- [ ] Hosting the site using GitHub Pages

## Technology Stacks

- React for front end
- ReduxJS Toolkit for managing the application state
- NodeJS for backend functionality
- SASS for styling the grid and node elements together with the animations
- Material UI (Core) for styling the rest of the user interface elements
- ESLint for linting and detecting early bugs
- Prettier for enforcing a consistent style in the code base

## Installation & Available Scripts

Download or clone the repository to your local machine.

In the project directory, you can run:

### `npm install`

Installs the dependencies for the project to run the other scrips locally.

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
