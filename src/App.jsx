import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Navigation from './components/Navigation.jsx';
import css from './App.module.css';

function App() {
  return (
    <>
      <Navigation />
      <div className={css.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="/movies/:movieId/cast" element={<MovieDetailsPage />} />
          <Route path="/movies/:movieId/reviews" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
