# React Pizza

A modern single-page pizza ordering application built with React, Redux Toolkit, and TypeScript.  
The project demonstrates state management, async data fetching, filtering, sorting, pagination, and deployment to GitHub Pages.

---

## Features

- Dynamic pizza catalog loaded from a mock API
- Category filtering
- Sorting (rating, price, name)
- Search by pizza name
- Pagination
- Cart management with quantity control
- Full pizza details page
- URL synchronization with filters and pagination
- Fully typed Redux store and custom typed hooks

---

## Technologies Used

- React 19
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Axios
- React Paginate
- React Content Loader
- Sass
- Create React App

---

## State Management

The project uses Redux Toolkit with:

- Typed slices (`cart`, `filter`, `pizzas`)
- Async thunks for API requests
- Custom typed hooks:
  - `useAppDispatch`
  - `useAppSelector`
- Fully typed `RootState` and `AppDispatch`

# Getting Started

## Clone the repository:

git clone https://github.com/your-username/react-pizza.git
cd react-pizza

## Install dependencies:

npm install

## Start the development server:

npm start

## Open in your browser:

http://localhost:3000

## Build for Production

npm run build<br>
The optimized production build will be generated in the build folder.

## Deployment

The project is configured for GitHub Pages deployment.

## To deploy:

npm run deploy<br>
The predeploy script automatically runs:

npm run build<br>
before publishing the contents of the build folder to the gh-pages branch.

## Live Demo

After deployment, the app will be available at:

https://your-username.github.io/react-pizza

Replace your-username with your actual GitHub username.
