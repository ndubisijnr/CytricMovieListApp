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

// /* Frame 16 */
//
// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 8px 8px 16px;
// gap: 16px;
//
// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;
//
// /* MovieCard color */
// background: #092C39;
// backdrop-filter: blur(100px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 12px;
