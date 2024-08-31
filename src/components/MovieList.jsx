import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { imageBaseUrl } from '../api/tmdb.js';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`}>
            {movie.poster_path ? (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                className={css.movieImage}
              />
            ) : (
              <div className={css.noImage}>No Image Available</div>
            )}
            <div className={css.movieTitle}>{movie.title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
