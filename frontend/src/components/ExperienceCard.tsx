import { Experience } from "../types";
import { Link } from "react-router-dom";

export default function ExperienceCard({ e }: { e: Experience }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ">
      {/* Image */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={e.image}
          alt={e.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-gray-100">
        <div className="flex justify-between items-start ">
          <h3 className="font-semibold text-lg text-gray-900">{e.title}</h3>
          {e.location && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
              {e.location}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Curated small-group experience. Certified guide. Safety first with
          gear included.
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            <span className="text-gray-600">From </span>
            <span className="font-semibold text-gray-900">₹{e.price ?? 0}</span>
          </div>
          <Link
            to={`/experiences/${e._id || e.id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium text-sm px-4 py-2 rounded-md transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
