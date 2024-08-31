import axios from 'axios';

const API_KEY = 'd14db170f9b4f1fc534f9e76c79d4868';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = {
  apiKey: API_KEY,
  baseURL: BASE_URL,
  instance: axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  }),
  methods: {
    getPopularMovies: async () => {
      try {
        const response = await tmdbApi.instance.get('/movie/popular');
        return response.data.results;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
      }
    },
    searchMovies: async (query) => {
      try {
        const response = await tmdbApi.instance.get('/search/movie', {
          params: { query },
        });
        return response.data.results;
      } catch (error) {
        console.error('Error searching for movies:', error);
        throw error;
      }
    },
    getMovieDetails: async (movieId) => {
      try {
        const response = await tmdbApi.instance.get(`/movie/${movieId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
        throw error;
      }
    },
    getMovieCast: async (movieId) => {
      try {
        const response = await tmdbApi.instance.get(`/movie/${movieId}/credits`);
        return response.data.cast;
      } catch (error) {
        console.error(`Error fetching cast for movie ID ${movieId}:`, error);
        throw error;
      }
    },
    getMovieReviews: async (movieId) => {
      try {
        const response = await tmdbApi.instance.get(`/movie/${movieId}/reviews`);
        return response.data.results;
      } catch (error) {
        console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
        throw error;
      }
    },
  },
};

export default tmdbApi.methods; // exporting the methods