import Link from 'next/link';
import { Movie } from '@/types/movies';
import MovieCard from '@/components/MovieCard';

const UpcomingMovies = ({ upcomingMovies }: { upcomingMovies: any }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-medium">Upcoming Movies</h1>
        <Link
          href="/movies/upcoming"
          className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
        >
          See all
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-4">
        {upcomingMovies.results.slice(0, 4).map((movie: Movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
