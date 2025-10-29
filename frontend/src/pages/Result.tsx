import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Result() {
  const { state } = useLocation();
  const nav = useNavigate();
  const success = state?.success;
  const refId = state?.refId || "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={() => {}} placeholder="" />

      <div className="flex flex-col items-center justify-center mt-20 text-center">
        {success ? (
          <>
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Booking Confirmed
            </h2>
            <p className="text-gray-600 mt-1">Ref ID: {refId}</p>
            <button
              onClick={() => nav("/")}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✕</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Booking Failed
            </h2>
            <button
              onClick={() => nav("/")}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
