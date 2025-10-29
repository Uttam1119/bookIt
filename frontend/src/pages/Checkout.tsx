import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";
import Header from "../components/Header";
import { PromoValidation } from "../types";
import { getErrorMessage } from "../utils/getErrorMessage";

export default function Checkout() {
  const nav = useNavigate();
  const loc = useLocation();
  const { experience, slot, quantity } = loc.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoValid, setPromoValid] = useState<PromoValidation | null>(null);
  const [agree, setAgree] = useState(false);
  const [checkingPromo, setCheckingPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!experience || !slot) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Missing booking data.{" "}
        <a href="/" className="text-yellow-500 underline">
          Go home
        </a>
      </div>
    );
  }

  const TAX_RATE = 0.06;
  const subtotal = experience.price * (quantity || 1);
  const taxes = Math.round(subtotal * TAX_RATE);

  const total =
    promoValid?.valid && typeof promoValid.newPrice === "number"
      ? promoValid.newPrice + taxes
      : subtotal + taxes;

  async function applyPromo() {
    if (!promo.trim()) return;
    setCheckingPromo(true);
    try {
      const res = await api.post("/promo/validate", {
        code: promo.trim(),
        amount: experience.price,
      });
      setPromoValid(res.data);
    } catch {
      setPromoValid({ valid: false });
    } finally {
      setCheckingPromo(false);
    }
  }

  async function handleConfirm() {
    if (!name || !email) {
      alert("Please enter your name and email");
      return;
    }
    if (!agree) {
      alert("Please agree to the terms and safety policy");
      return;
    }

    setLoading(true);
    try {
      console.log("Selected slot before booking:", slot);

      const res = await api.post("/bookings", {
        experienceId: experience._id || experience.id,
        slotId: slot._id,
        name,
        email,
        promoCode: promoValid?.valid ? promo : null,
        quantity,
      });

      const refId = res.data?.booking?._id || "N/A";
      nav("/result", { state: { success: true, refId } });
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("Booking error:", message);
      nav("/result", { state: { success: false, error: message } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={() => {}} placeholder="" />

      <main className="w-full px-35 py-8">
        <button
          onClick={() => nav(-1)}
          className="text-sm text-neutral-900 hover:text-gray-700 mb-6 flex items-center gap-1 cursor-pointer"
        >
          ← Checkout
        </button>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* LEFT COLUMN */}
          <div>
            <div className="bg-gray-100 rounded-xl shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 bg-gray-200 rounded-md p-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 bg-gray-200 rounded-md p-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="flex-1 border border-gray-300 bg-gray-200 rounded-md p-2 focus:ring-yellow-400 focus:outline-none"
                />
                <button
                  onClick={applyPromo}
                  disabled={checkingPromo}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition cursor-pointer"
                >
                  {checkingPromo ? "..." : "Apply"}
                </button>
              </div>

              {promoValid && (
                <div className="mt-2 text-sm">
                  {promoValid.valid ? (
                    <span className="text-green-600">
                      Promo applied — new price ₹{promoValid.newPrice}
                    </span>
                  ) : (
                    <span className="text-red-600">Invalid promo code</span>
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-black w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="agree"
                  className="text-sm text-gray-700 select-none"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — SUMMARY */}
          <aside className="bg-gray-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 h-fit self-start">
            <div className="text-sm text-gray-600 space-y-4">
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium text-gray-900">
                  {experience.title}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(slot.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Time</span>
                <span className="font-medium text-gray-900">{slot.time}</span>
              </div>

              <div className="flex justify-between">
                <span>Qty</span>
                <span className="font-medium text-gray-900">
                  {quantity || 1}
                </span>
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

            <div className="flex justify-between text-base font-semibold text-gray-900 mt-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full mt-6 py-3 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer"
            >
              {loading ? "Booking..." : "Pay and Confirm"}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
