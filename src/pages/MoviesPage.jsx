import { useCallback, useState } from 'react';
import tmdbApi from '../api/tmdb.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../App.module.css';
import MovieList from '../components/MovieList.jsx';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async () => {
    setLoading(true);
    if (searchQuery.trim()) {
      try {
        const response = await tmdbApi.searchMovies(searchQuery);
        setMovies(response);
      } catch (error) {
        toast.error('Error fetching movies. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Search query cannot be empty.');
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Search query cannot be empty.');
      return;
    }
    searchMovies();
    setSearchQuery('');
  };

  return (
    <>
      <h1>Movies Page</h1>
      <form onSubmit={handleSearchSubmit} className={css.formContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a movie..."
          className={css.input}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      <ToastContainer />
    </>
  );
};

export default MoviesPage;
