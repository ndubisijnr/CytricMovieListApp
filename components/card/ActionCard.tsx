"use client";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlay, FaTrash } from "react-icons/fa";

function ActionCard({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <div className="flex absolute group-hover:opacity-100 opacity-0 transition z-40 h-[100%] w-[100%] items-center justify-center bg-black/50 text-white rounded-lg">
      {/* Icons */}
      <div className="flex gap-4">
        {/* Play */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 transition duration-300"
          title="Play"
        >
          <FaPlay />
        </button>
        {/* Edit */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition duration-300"
          title="Edit"
          onClick={() => router.push(`/movies/edit/${slug}`)}
        >
          <FaEdit />
        </button>
        {/* Delete */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition duration-300"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ActionCard;
