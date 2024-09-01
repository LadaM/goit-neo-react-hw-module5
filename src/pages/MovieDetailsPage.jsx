import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import tmdbApi, { imageBaseUrl } from '../api/tmdb';
import { toast, ToastContainer } from 'react-toastify';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const backRef = location.state ?? '/movies';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await tmdbApi.getMovieDetails(movieId);
        setMovie(movieDetails);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching movie details. Please try again. ${error.message}`);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={css.container}>
          <div className={css.details}>
            {movie.poster_path && (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                className={css.poster}
              />
            )}
            <div className={css.info}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <ul className={css.links}>
                <li>
                  <Link to={backRef}><span>← </span>Go Back</Link>
                </li>
                <li className={css.linkItem}>
                  <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                </li>
                <li className={css.linkItem}>
                  <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
                </li>
              </ul>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MovieDetailsPage;
