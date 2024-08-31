import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../App.module.css';
import MovieList from '../components/MovieList.jsx';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async (query) => {
    setLoading(true);
    if (query.trim()) {
      try {
        const response = await tmdbApi.searchMovies(query);
        setMovies(response);
      } catch (error) {
        toast.error(`Error fetching movies. Please try again. ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Search query cannot be empty.');
      setLoading(false);
    }
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Search query cannot be empty.');
      return;
    }
    setSearchParams({ query: searchQuery });
    searchMovies(searchQuery);
  };

  useEffect(() => {
    if (queryFromUrl) {
      searchMovies(queryFromUrl);
    }
  }, [queryFromUrl, searchMovies]);

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
      {movies.length > 0 && !loading && (
        <MovieList movies={movies} />
      )}
      <ToastContainer />
    </>
  );
};

export default MoviesPage;
