import apiClient from '@/libs/axios';
import { Cast } from '@/types/cast';
import { Movie, Movies } from '@/types/movies';

const api_key = process.env.API_KEY;

const getMoviesByType = async (type: string, page?: number) => {
  const response = await apiClient.get<Movies>(
    `/movie/${type}?api_key=${api_key}&language=en-US&page=${page}`
  );
  return response.data;
};

const getMovieById = async (id: number) => {
  const response = await apiClient.get<Movie>(
    `/movie/${id}?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

const getMovieCasts = async (id: number) => {
  const response = await apiClient.get<Cast>(
    `/movie/${id}/credits?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

const getMovieRecommendation = async (id: number) => {
  const response = await apiClient.get<Movie>(
    `/movie/${id}/recommendations?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

const MoviesServices = {
  getMoviesByType,
  getMovieById,
  getMovieCasts,
  getMovieRecommendation,
};
export default MoviesServices;
