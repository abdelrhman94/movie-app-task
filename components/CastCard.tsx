import { Cast } from '@/types/cast';
import Image from 'next/image';

const CastCard = ({ cast }: { cast: Cast }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[400px] relative">
        <Image
          className="rounded-2xl"
          src={
            cast?.profile_path
              ? `${process.env.IMAGE_URL}${cast?.profile_path}`
              : `${process.env.EMPTY_MOVIE_URL}`
          }
          alt={cast?.name}
          fill={true}
        />
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <h2 className="text-lg font-medium">{cast?.name}</h2>
        <h2 className="text-lg font-medium">{cast?.character}</h2>
      </div>
    </div>
  );
};

export default CastCard;
