import ActionCard from "@/components/card/ActionCard";
interface cardProps {
    title?: string;
    published?:string,
    image?:string,
}
function MovieCard({ title, published, image }: cardProps) {
    return (
        <div className="relative">
            <ActionCard/>

            <div className="w-full relative  bg-[#092C39] backdrop-blur-md rounded-lg lg:p-4 p-2 shadow-lg hover:scale-105 cursor-pointer">

                <div className="rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt={`${image}-title`}
                        className="w-full lg:h-[400px] h-[334px] object-cover"
                    />
                </div>
                <div className="mt-4">
                    <p className="body-small lg:header-five text-white truncate mb-3">{title}</p>
                    <p className="text-sm text-gray-400">{published}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;