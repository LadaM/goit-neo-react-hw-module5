import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import { toast } from 'react-toastify';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [ref.current]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const movieReviews = await tmdbApi.getMovieReviews(movieId);
        setReviews(movieReviews);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching movie reviews. Please try again. ${error.message}`);
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id={'reviews'} ref={ref}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
