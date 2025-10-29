import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import { Experience } from "../types";
import Header from "../components/Header";
import Loader from "../components/Loader";

export default function Details() {
  const { id } = useParams();
  const nav = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null); // store full slot object
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSlotCapacity, setSelectedSlotCapacity] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetchExperience();
  }, [id]);

  async function fetchExperience() {
    try {
      setLoading(true);
      const res = await api.get(`/experiences/${id}`);
      setExperience(res.data);
    } catch (err) {
      console.error("Error fetching experience:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    if (!experience || !selectedSlot) {
      alert("Please choose a date and time slot before confirming.");
      return;
    }

    nav("/checkout", { state: { experience, slot: selectedSlot, quantity } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!experience) {
    return <div className="text-center mt-20">Experience not found.</div>;
  }

  const groupedSlots: Record<string, typeof experience.slots> = {};
  experience.slots.forEach((slot) => {
    if (!groupedSlots[slot.date]) groupedSlots[slot.date] = [];
    groupedSlots[slot.date].push(slot);
  });

  const dates = Object.keys(groupedSlots);

  const TAX_RATE = 0.06;
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={() => {}} placeholder="" />

      <main className="w-full px-35 py-8">
        <button
          onClick={() => nav(-1)}
          className="text-sm text-neutral-800 hover:text-gray-700 mb-6 flex items-center gap-1 cursor-pointer"
        >
          ← Details
        </button>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* LEFT SIDE */}
          <div>
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-[380px] object-cover rounded-xl shadow-md"
            />

            <h2 className="text-2xl font-semibold text-gray-900 mt-6">
              {experience.title}
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Curated small-group experience. Certified guide. Safety first with
              gear included. Helmet and life jackets along with an expert will
              accompany in {experience.title.toLowerCase()}.
            </p>

            {/* DATES */}
            <div className="mt-6">
              <h3 className="text-gray-800 font-medium mb-2">Choose date</h3>
              <div className="flex flex-wrap gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDate(d);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      selectedDate === d
                        ? "bg-yellow-400 border-yellow-400 text-gray-900 font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:border-yellow-400"
                    }`}
                  >
                    {new Date(d).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* TIME SLOTS */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-gray-800 font-medium mb-2">Choose time</h3>
                <div className="flex flex-wrap gap-2">
                  {groupedSlots[selectedDate]?.map((slot) => {
                    const soldOut = slot.capacity <= 0;
                    const fewLeft = slot.capacity <= 3 && slot.capacity > 0;

                    const slotKey = `${experience.id}-${selectedDate}-${slot.slotId}`;
                    const isSelected =
                      selectedSlot?.slotId === slot.slotId &&
                      selectedSlot?.date === selectedDate &&
                      selectedSlot?.time === slot.time;

                    return (
                      <button
                        key={slotKey}
                        disabled={soldOut}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSlot(null);
                          } else {
                            setSelectedSlot({ ...slot, date: selectedDate });
                            setSelectedSlotCapacity(slot.capacity);
                            setQuantity(1);
                          }
                        }}
                        className={`px-4 py-2 rounded-md border text-sm flex items-center gap-1 transition
        ${
          soldOut
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-yellow-400 border-yellow-400 text-gray-900 font-medium"
            : "bg-white border-gray-300 text-gray-700 hover:border-yellow-400"
        }`}
                      >
                        <span>{slot.time}</span>
                        {soldOut ? (
                          <span className="text-xs text-gray-400 ml-1">
                            Sold out
                          </span>
                        ) : fewLeft ? (
                          <span className="text-xs text-red-500 ml-1">
                            {slot.capacity} left
                          </span>
                        ) : (
                          <span className="text-xs text-green-600 ml-1">
                            {slot.capacity} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* ABOUT */}
            <div className="mt-8">
              <h3 className="text-gray-800 font-medium mb-2">About</h3>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-700">
                Scenic routes, trained guides, and safety briefing. Minimum age
                10.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — SUMMARY CARD */}
          <aside className="bg-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] h-fit p-6 self-start">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Starts at</span>
              <span className="font-medium text-gray-900">
                ₹{experience.price}
              </span>
            </div>

            {/* Pricing Summary */}
            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>Quantity</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-4 h-4 border border-gray-200 flex text-gray-900 items-center justify-center hover:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="w-5 text-center">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        selectedSlotCapacity
                          ? Math.min(selectedSlotCapacity, prev + 1)
                          : prev + 1
                      )
                    }
                    className="w-4 h-4 border border-gray-200 flex text-gray-900 items-center justify-center hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-medium text-gray-900">₹{taxes}</span>
              </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedSlot}
              className={`mt-6 w-full py-3 rounded-md font-medium ${
                selectedSlot
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
