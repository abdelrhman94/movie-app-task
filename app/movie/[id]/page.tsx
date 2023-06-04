import Image from 'next/image';
import MoviesServices from '@/services/MoviesServices';
import { Movie } from '@/types/movies';
import dayjs from 'dayjs';

interface IParamsMovieDetails {
  params: {
    id: Movie['id'];
  };
}

const page = async ({ params }: IParamsMovieDetails) => {
  const { id } = params;
  const movie = await MoviesServices.getMoviesById(id);
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
                  src={
                    movie?.poster_path
                      ? `${process.env.IMAGE_URL}${movie?.poster_path}`
                      : `${process.env.EMPTY_MOVIE_URL}`
                  }
                  alt={movie?.title}
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
    </main>
  );
};

export default page;
