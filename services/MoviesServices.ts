import apiClient from '@/libs/axios';
import { Movies } from '@/types/movies';

const api_key = process.env.API_KEY;


const getMoviesByType = async (type: string) => {
  const response = await apiClient.get<Movies>(
    `/movie/${type}?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

const MoviesServices = {
  getMoviesByType,
};
export default MoviesServices;
