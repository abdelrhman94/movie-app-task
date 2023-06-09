import MoviesServices from '@/services/MoviesServices';
import PopularMovies from '@/containers/PopularMovies';
import UpcomingMovies from '@/containers/UpcomingMovies';
import TopRatedMovies from '@/containers/TopRatedMovies';

export default async function Home() {
  const popularMovies = await MoviesServices.getMoviesByType('popular');
  const upcomingMovies = await MoviesServices.getMoviesByType('upcoming');
  const topRatedMovies = await MoviesServices.getMoviesByType('top_rated');

  return (
    <main className="mt-5 flex flex-col flex-wrap">
      <div className="w-[1300px] max-w-full px-4 mx-auto">
        <PopularMovies popularMovies={popularMovies} />
        <UpcomingMovies upcomingMovies={upcomingMovies} />
        <TopRatedMovies topRatedMovies={topRatedMovies} />
      </div>
    </main>
  );
}
