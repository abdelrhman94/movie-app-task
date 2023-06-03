import apiClient from '@/libs/axios';
import { Movies } from '@/types/movies';

const api_key = process.env.API_KEY;

const getMoviesByType = async (type: string, page?: number) => {
  const response = await apiClient.get<Movies>(
    `/movie/${type}?api_key=${api_key}&language=en-US&page=${page}`
  );
  return response.data;
};

const getMoviesById =async (id:string) => {
  const response = await apiClient
  
}

const MoviesServices = {
  getMoviesByType,
};
export default MoviesServices;
