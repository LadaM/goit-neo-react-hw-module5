import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import { toast } from 'react-toastify';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const movieCast = await tmdbApi.getMovieCast(movieId);
        setCast(movieCast);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching movie cast. Please try again.');
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
