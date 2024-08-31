import { Route, Routes } from 'react-router-dom';
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Navigation from './components/Navigation.jsx';
import css from './App.module.css';
import { lazy, Suspense } from 'react';
import MovieCast from './components/MovieCast.jsx';
import MovieReviews from './components/MovieReviews.jsx';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));

function App() {
  return (
    <>
      <Navigation />
      <div className={css.container}>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
