import { useEffect, useState } from "react";
import { Plus, Loader2, X } from "lucide-react";
import AddCardModal from "../AddCardModal";

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const PAYMENT_STORAGE_KEY = "checkout_payment";

interface CardApi {
  cardId: string;
  _id: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
  isDefault: boolean;
  addedAt: string;
}

interface CardFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
  brand: string;
  isDefault: boolean;
}

const EMPTY_CARD_FORM: CardFormData = {
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cardHolder: "",
  brand: "Visa",
  isDefault: false,
};

export function PaymentStep() {
  const [cards, setCards] = useState<CardApi[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardForm, setCardForm] = useState<CardFormData>(EMPTY_CARD_FORM);
  const [cardError, setCardError] = useState("");
  const [cardSaving, setCardSaving] = useState(false);

    const saveSelectedCard = (card: CardApi | undefined) => {
    if (!card) {
      localStorage.removeItem(PAYMENT_STORAGE_KEY);
      return;
    }
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(card));
  };

  const getToken = () => localStorage.getItem("authToken") || "";

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  // ---------- GET saved cards ----------
  const fetchCards = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch(`${API_BASE}/wallet/cards`, { headers: authHeaders() });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to load saved cards.");
      }

      const list: CardApi[] = data?.data?.cards || [];
      setCards(list);

      const defaultCard = list.find((c) => c.isDefault);
      const initialCard = defaultCard || list[0];
      setSelected(initialCard?.cardId || "");
      saveSelectedCard(initialCard);       
    } catch (err: unknown) {
      setFetchError(
        err instanceof Error ? err.message : "Unable to load saved cards.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // ---------- POST add card ----------
  const handleSaveCard = async () => {
    setCardSaving(true);
    setCardError("");

    try {
      const res = await fetch(`${API_BASE}/wallet/cards`, { method: "POST", headers: authHeaders(), body: JSON.stringify(cardForm) });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add card.");
      }

      const newCard: CardApi = data?.data?.card;

      setCards((prev) => {
        const updated = newCard.isDefault
          ? prev.map((c) => ({ ...c, isDefault: false }))
          : prev;
        return [...updated, newCard];
      });
      setSelected(newCard.cardId);
      saveSelectedCard(newCard);                // 👈 add

      setOpenAddCardModal(false);
      setCardForm(EMPTY_CARD_FORM);
      setCardError("");
    } catch (err: unknown) {
      setCardError(err instanceof Error ? err.message : "Unable to add card.");
    } finally {
      setCardSaving(false);
    }
  };

  const updateCardForm = (
    field: keyof CardFormData,
    value: string | boolean,
  ) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="border border-[#1D293D] rounded-lg lg:rounded-2xl lg:p-6 p-3 bg-[#0F172B80]">
      <h2 className="font-playfair text-2xl mb-6 text-white">Payment Method</h2>

      {fetchError && <p className="text-red-400 text-sm mb-4">{fetchError}</p>}

      {loading ? (
        <div className="flex items-center justify-center gap-2 text-[#94A3B8] py-10">
          <Loader2 size={20} className="animate-spin" />
          Loading saved cards...
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => {
            const active = selected === card.cardId;

            return (
              <div
                key={card.cardId}
                onClick={() => {
              setSelected(card.cardId);
              saveSelectedCard(card);            // 👈 add — manual selection pe bhi persist
            }}
                className={`flex items-center relative justify-between lg:p-5 p-3 rounded-lg lg:rounded-xl border cursor-pointer transition
                ${
                  active ? "border-[#00BC7D] bg-[#031F2E]" : "border-[#1E293B]"
                }`}
              >
                <div className="flex items-center lg:gap-4 gap-2 ">
                  <div className="w-14 h-10 bg-[#1E293B] rounded-md flex items-center justify-center text-sm font-semibold">
                    {card.brand === "Visa" ? (
                      <span className="text-blue-400">VISA</span>
                    ) : (
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2"></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 ">
                      <p className="text-white lg:text-lg text-sm">
                        {card.brand} •••• {card.last4}
                      </p>

                      {card.isDefault && (
                        <span className="absolute sm:relative -top-3 sm:top-[unset] right-2 sm:right-[unset] text-xs px-2 py-1 rounded-full bg-[#1E293B] text-[#94A3B8]">
                          Primary
                        </span>
                      )}
                    </div>

                    <p className="text-[#94A3B8]">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center
                  ${active ? "border-[#00BC7D]" : "border-[#475569]"}`}
                >
                  {active && (
                    <div className="w-3 h-3 rounded-full bg-[#00BC7D]" />
                  )}
                </div>
              </div>
            );
          })}

          {!loading && cards.length === 0 && (
            <p className="text-[#94A3B8] text-sm text-center py-6">
              No saved cards yet. Add one to continue.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => {
          setCardForm(EMPTY_CARD_FORM);
          setCardError("");
          setOpenAddCardModal(true);
        }}
        className="mt-6 w-full bg-[#E5E7EB] text-black py-4 rounded-xl flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add New Card
      </button>

      <AddCardModal
        open={openAddCardModal}
        onClose={() => setOpenAddCardModal(false)}
        cardNumber={cardForm.cardNumber}
        setCardNumber={(value) => updateCardForm("cardNumber", value)}
        expiryMonth={cardForm.expiryMonth}
        setExpiryMonth={(value) => updateCardForm("expiryMonth", value)}
        expiryYear={cardForm.expiryYear}
        setExpiryYear={(value) => updateCardForm("expiryYear", value)}
        cardHolder={cardForm.cardHolder}
        setCardHolder={(value) => updateCardForm("cardHolder", value)}
        cardBrand={cardForm.brand}
        setCardBrand={(value) => updateCardForm("brand", value)}
        cardIsDefault={cardForm.isDefault}
        setCardIsDefault={(value) => updateCardForm("isDefault", value)}
        brands={["Visa", "Mastercard"]}
        loading={cardSaving}
        error={cardError}
        formatCardNumber={(value) => value.replace(/(\d{4})(?=\d)/g, "$1 ")}
        onSubmit={handleSaveCard}
      />
    </div>
  );
}
