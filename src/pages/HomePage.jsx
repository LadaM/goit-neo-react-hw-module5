import tmdbApi from '../api/tmdb.js';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList.jsx';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await tmdbApi.getPopularMovies();
          setPopularMovies(response);
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
        <MovieList movies={popularMovies} />
      </div>
    </div>
  );
};

export default HomePage;