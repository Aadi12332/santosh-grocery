import { Loader2, X } from "lucide-react";

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
  cardBrand: string;
  cardIsDefault: boolean;

  setCardNumber: (value: string) => void;
  setExpiryMonth: (value: string) => void;
  setExpiryYear: (value: string) => void;
  setCardHolder: (value: string) => void;
  setCardBrand: (value: string) => void;
  setCardIsDefault: (value: boolean) => void;

  brands: string[];

  loading: boolean;
  error: string;

  formatCardNumber: (value: string) => string;
  onSubmit: () => void;
}

const AddCardModal = ({
  open,
  onClose,
  cardNumber,
  setCardNumber,
  expiryMonth,
  setExpiryMonth,
  expiryYear,
  setExpiryYear,
  cardHolder,
  setCardHolder,
  cardBrand,
  setCardBrand,
  cardIsDefault,
  setCardIsDefault,
  brands,
  loading,
  error,
  formatCardNumber,
  onSubmit,
}: AddCardModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 !mt-0 px-4">
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-playfair text-xl text-white">
            Add New Card
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#94A3B8] hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="text-sm text-[#94A3B8] block mb-1.5">
            Card Number
          </label>

          <input
            placeholder="1234 5678 9012 3456"
            value={formatCardNumber(cardNumber)}
            onChange={(e) =>
              setCardNumber(
                e.target.value.replace(/\D/g, "").slice(0, 16)
              )
            }
            maxLength={19}
            className="w-full bg-[#020618] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] outline-none focus:border-[#009966]"
          />
        </div>

        {/* Expiry */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-[#94A3B8] block mb-1.5">
              Expiry Month
            </label>

            <input
              placeholder="MM"
              maxLength={2}
              value={expiryMonth}
              onChange={(e) =>
                setExpiryMonth(e.target.value.replace(/\D/g, ""))
              }
              className="w-full bg-[#020618] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] outline-none focus:border-[#009966]"
            />
          </div>

          <div>
            <label className="text-sm text-[#94A3B8] block mb-1.5">
              Expiry Year
            </label>

            <input
              placeholder="YYYY"
              maxLength={4}
              value={expiryYear}
              onChange={(e) =>
                setExpiryYear(e.target.value.replace(/\D/g, ""))
              }
              className="w-full bg-[#020618] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] outline-none focus:border-[#009966]"
            />
          </div>
        </div>

        {/* Card Holder */}
        <div className="mb-4">
          <label className="text-sm text-[#94A3B8] block mb-1.5">
            Card Holder
          </label>

          <input
            placeholder="Full name on card"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full bg-[#020618] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] outline-none focus:border-[#009966]"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="text-sm text-[#94A3B8] block mb-1.5">
            Brand
          </label>

          <select
            value={cardBrand}
            onChange={(e) => setCardBrand(e.target.value)}
            className="w-full bg-[#020618] border border-[#1E293B] rounded-lg px-4 py-3 text-white outline-none focus:border-[#009966]"
          >
            {brands.map((brand) => (
              <option
                key={brand}
                value={brand}
                className="bg-[#020618] text-white"
              >
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Default */}
        <label className="flex items-center gap-2 text-[#94A3B8] mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={cardIsDefault}
            onChange={(e) => setCardIsDefault(e.target.checked)}
            className="accent-[#009966]"
          />
          Set as default card
        </label>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="border border-[#1E293B] text-[#94A3B8] hover:bg-[#1E293B] px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-[#009966] hover:bg-[#00b377] text-white px-5 py-2 rounded-lg disabled:opacity-60 flex items-center gap-2 transition"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Saving..." : "Add Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;