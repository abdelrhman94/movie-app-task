import Image from 'next/image';
import MoviesServices from '@/services/MoviesServices';
import { Movie } from '@/types/movies';
import dayjs from 'dayjs';
import { Cast } from '@/types/cast';
import CastCard from '@/components/CastCard';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

interface IParamsMovieDetails {
  params: {
    id: Movie['id'];
  };
}

export async function generateMetadata({ params }: IParamsMovieDetails) {
  const { id } = params;
  const movie = await MoviesServices.getMovieById(id);
  return { title: movie.title };
}

const page = async ({ params }: IParamsMovieDetails) => {
  const { id } = params;
  const movie = await MoviesServices.getMovieById(id);
  const movieCast = await MoviesServices.getMovieCasts(id);
  const recommendations = await MoviesServices.getMovieRecommendation(id);
  const durationHours = Math.round(movie?.runtime / 60);
  const durationMinutes = Math.round(movie?.runtime % 60);

  return (
    <main className="mt-5 flex flex-col">
      <div className="w-[1000px] max-w-full px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="flex gap-7">
            <div className="flex relative">
              <div className="w-[270px] h-[400px] relative">
                <Image
                  className="rounded-2xl"
                  src={
                    movie?.poster_path
                      ? `${process.env.IMAGE_URL}${movie?.poster_path}`
                      : `${process.env.EMPTY_MOVIE_URL}`
                  }
                  alt={movie?.title}
                  placeholder="blur"
                  blurDataURL="/blur.jpg"
                  fill={true}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <h2 className="text-xl font-medium">{movie?.title}</h2>
                <span
                  className={`flex flex-col p-2 text-white rounded-md ${
                    movie?.vote_average <= 5 ? `bg-red-700` : `bg-green-700`
                  }`}
                >
                  {movie?.vote_average}
                </span>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <h5 className="text-md font-medium">
                  {dayjs(movie?.release_date).format('MMM DD YYYY')}
                </h5>
                <h5> | </h5>
                {movie?.runtime > 0 && (
                  <>
                    <h5 className="text-md font-medium">{`${durationHours}h ${durationMinutes}m`}</h5>
                    <h5> | </h5>
                  </>
                )}
                <h5 className="text-md font-medium">
                  {movie?.genres?.map((genre: any) => genre?.name).join(', ')}
                </h5>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-md font-normal">{movie?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1200px] max-w-full px-4 mx-auto">
        <div className="flex flex-col mb-6 mt-6">
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-medium">Top Cast</h1>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-4">
            {movieCast?.cast?.slice(0, 4).map((cast: Cast) => (
              <CastCard key={cast?.id} cast={cast} />
            ))}
          </div>
        </div>
        <div className="flex flex-col mb-6 mt-6">
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-medium">Top Recommendations</h1>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-4">
            {recommendations?.results?.slice(0, 4).map((movie: Movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
