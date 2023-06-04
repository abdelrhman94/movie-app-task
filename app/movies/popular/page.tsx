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
  return { title: 'Movies | popular' };
}

const page = async ({ searchParams }: Props) => {
  const page = searchParams?.page || 1;
  const popularMovies = await MoviesServices.getMoviesByType('popular', page);

  return (
    <main className="mt-5 flex flex-col">
      <div className="w-[1300px] max-w-full px-4 mx-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Popular Movies</h1>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-4">
          {popularMovies.results.map((movie: Movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
        <Pagination
          currentPage={page < 1 || page > popularMovies.total_pages ? 1 : page}
          totalPages={popularMovies.total_pages}
          pageType="popular"
        />
      </div>
    </main>
  );
};
export default page;
