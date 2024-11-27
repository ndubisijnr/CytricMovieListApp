import ActionCard from "@/components/card/ActionCard";
import Image from "next/image";
interface MovieProps {
  title: string;
  published: number;
  coverImage: string;
  slug: string;
}
function MovieCard({ title, published, coverImage, slug }: MovieProps) {
  return (
    <div className="relative group">
      <ActionCard slug={title} />

      <div className="w-full relative  bg-[#092C39] backdrop-blur-md rounded-lg lg:p-4 p-2 shadow-lg hover:scale-105 cursor-pointer">
        <div className="rounded-lg overflow-hidden lg:h-[400px] h-[334px] relative">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="w-full object-cover"
          />
        </div>
        <div className="mt-4">
          <p className="body-small lg:header-five text-white truncate mb-3">
            {title}
          </p>
          <p className="text-sm text-gray-400">{published}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
