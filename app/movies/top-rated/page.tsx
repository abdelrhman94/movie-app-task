import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import MoviesServices from '@/services/MoviesServices';
import { Movie } from '@/types/movies';

type Props = {
  searchParams?: {
    page?: number;
  };
};
export async function generateMetadata() {
  return { title: 'Movies | Top Rated' };
}

const page = async ({ searchParams }: Props) => {
  const page = searchParams?.page || 1;
  const topRatedMovies = await MoviesServices.getMoviesByType(
    'top_rated',
    page
  );

  return (
    <main className="mt-5 flex flex-col">
      <div className="w-[1300px] max-w-full px-4 mx-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Top Rated Movies</h1>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-4">
          {topRatedMovies.results.map((movie: Movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
        <Pagination
          currentPage={page < 1 || page > topRatedMovies.total_pages ? 1 : page}
          totalPages={topRatedMovies.total_pages}
          pageType="top-rated"
        />
      </div>
    </main>
  );
};
export default page;
