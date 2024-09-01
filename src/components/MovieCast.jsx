import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import { toast } from 'react-toastify';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const castRef = useRef(null);

  useEffect(() => {
    if (castRef.current)
      castRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
    <>
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <div id={'cast'} ref={castRef}>
          <h2>Cast</h2>
          <ul>
            {cast.map(actor => (
              <li key={actor.cast_id}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MovieCast;
