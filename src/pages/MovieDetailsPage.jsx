import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb.js';
import { useCallback, useEffect } from 'react';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  console.log(movieId);
  const getMovieDetails = useCallback(async () => {
    try {
      const response = await tmdbApi.getMovieDetails(movieId);
      console.log(response);
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movieId}:`, error);
      throw error;
    }
  }, [movieId]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  return (
    <div>
      <h1>MovieDetailsPage</h1>
    </div>
  );
};

export default MovieDetailsPage;