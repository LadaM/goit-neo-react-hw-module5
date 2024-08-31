import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import { toast } from 'react-toastify';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    }
  }, [ref.current]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const movieCast = await tmdbApi.getMovieCast(movieId);
        setCast(movieCast);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching movie cast. Please try again. ${error.message}`);
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id={'cast'} ref={ref}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
