import { useCallback, useState } from 'react';
import tmdbApi  from '../api/tmdb.js';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchMovies = useCallback(async () => {
    console.log('Searching for movies...');
    try {
      const response = await tmdbApi.searchMovies(searchQuery);
      console.log(response);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div>
      <h1>Movies Page</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MoviesPage;