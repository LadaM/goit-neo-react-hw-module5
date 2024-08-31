import tmdbApi from '../api/tmdb.js';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await tmdbApi.getPopularMovies();
          console.log(response);
        } catch (error) {
          console.error('Error fetching popular movies:', error);
          throw error;
        }
      };
      getMovies();
    }, []); // loading movies on page load
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Popular Movies</h2>
      </div>
    </div>
  );
};

export default HomePage;