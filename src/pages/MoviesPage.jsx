import { useState, useCallback } from 'react';
import tmdbApi from '../api/tmdb.js';
import MovieList from '../components/MovieList.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../App.module.css';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Callback to handle movie search
  const searchMovies = useCallback(async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      try {
        const response = await tmdbApi.searchMovies(searchQuery);
        setMovies(response);
      } catch (error) {
        toast.error('Error fetching movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Search query cannot be empty.');
    }
  }, [searchQuery]);

  // Handles the change in the search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handles the form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchMovies(); // Trigger the movie search when the form is submitted
    setSearchQuery(''); // Clear the search query after submitting
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
        <button type="submit" disabled={isLoading}>Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
      <ToastContainer />
    </>
  );
};

export default MoviesPage;