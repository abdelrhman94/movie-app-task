import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movies';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie?.id}`} className="w-full flex flex-col">
      <div className="w-full h-[400px] relative">
        <Image
          className="rounded-2xl"
          src={
            movie?.poster_path
              ? `${process.env.IMAGE_URL}${movie?.poster_path}`
              : `${process.env.EMPTY_MOVIE_URL}`
          }
          alt={movie?.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          placeholder="empty"
        />
      </div>
      <div className="flex gap-4 justify-center items-center mt-3 bg-red">
        <h2 className="text-lg font-medium">{movie?.title}</h2>
        <span
          className={`flex flex-col p-1.5 text-white rounded-full ${
            movie?.vote_average <= 5 ? `bg-red-700` : `bg-green-700`
          }`}
        >
          {movie?.vote_average.toFixed(1)}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
