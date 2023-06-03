import MoviesServices from '@/services/MoviesServices';
import PopularMovies from '@/components/PopularMovies';

export default async function Home() {
  const popularMovies = await MoviesServices.getMoviesByType('popular');

  return (
    <main className="mt-5 flex flex-col flex-wrap">
      <div className="w-[1300px] max-w-full px-4 mx-auto">
        <PopularMovies popularMovies={popularMovies} />
      </div>
    </main>
  );
}
