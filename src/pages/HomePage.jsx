import React, { Suspense, useEffect, useState } from 'react';
import tmdbApi from '../api/tmdb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieList = React.lazy(() => import('../components/MovieList'));

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await tmdbApi.getPopularMovies();
        setMovies(popularMovies); // Update state directly
        setLoading(false);        // Set loading to false after data is set
      } catch (error) {
        toast.error('Error fetching popular movies. Please try again.');
        setLoading(false);        // Ensure loading is false even on error
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <h1>Popular Movies</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Suspense fallback={<div>Loading movies...</div>}>
          <MovieList movies={movies} />
        </Suspense>
      )}
      <ToastContainer />
    </>
  );
};

export default HomePage;
