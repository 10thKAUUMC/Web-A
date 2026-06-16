import './App.css'
import Homepage from './pages/Homepage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailpage from './pages/MovieDetailpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/detail/:movieId',  // detail 추가
        element: <MovieDetailpage />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App