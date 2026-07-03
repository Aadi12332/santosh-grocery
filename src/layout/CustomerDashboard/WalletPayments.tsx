import {
  Wallet,
  Plus,
  ArrowUpRight,
  CreditCard,
  Gift,
  Clock,
  ArrowUpRight as Out,
  ArrowDownLeft,
  Star,
  Crown,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import VoucherSection from "./VoucherSection";

type WalletData = {
  balance: number;
  rewardPoints: number;
  membershipTier: string;
};

type Transaction = {
  _id: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  status: string;
  transactionId: string;
  createdAt: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const PAGE_LIMIT = 10;

const PAYMENT_METHODS = [
  { value: "card", label: "Card" },
  { value: "upi", label: "UPI" },
  { value: "netbanking", label: "Net Banking" },
];

export default function WalletPayments() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState("");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  // Top up modal state
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpMethod, setTopUpMethod] = useState("card");
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpError, setTopUpError] = useState("");

  // Withdraw modal state
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  const fetchWallet = async () => {
    setWalletLoading(true);
    setWalletError("");

    const token = localStorage.getItem("authToken");

    if (!token) {
      setWalletError("Authentication token not found.");
      setWalletLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load wallet.");
      }

      setWallet(data?.data ?? null);
    } catch (err) {
      setWalletError(
        err instanceof Error ? err.message : "Unable to load wallet.",
      );
    } finally {
      setWalletLoading(false);
    }
  };

  useEffect(() => {
    void fetchWallet();
  }, []);

  const fetchTransactions = async (page: number, append: boolean) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setTransactionsError("Authentication token not found.");
      setTransactionsLoading(false);
      return;
    }

    if (append) {
      setLoadingMore(true);
    } else {
      setTransactionsLoading(true);
    }
    setTransactionsError("");

    try {
      const response = await fetch(
        `${API_BASE}/wallet/transactions?page=${page}&limit=${PAGE_LIMIT}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load transactions.");
      }

      const items: Transaction[] = data?.data?.data ?? [];
      const pageInfo: Pagination | null = data?.data?.pagination ?? null;

      setTransactions((prev) => (append ? [...prev, ...items] : items));
      setPagination(pageInfo);
    } catch (err) {
      setTransactionsError(
        err instanceof Error ? err.message : "Unable to load transactions.",
      );
    } finally {
      setTransactionsLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    void fetchTransactions(1, false);
  }, []);

  const formattedBalance = walletLoading
    ? "—"
    : `$${(wallet?.balance ?? 0).toFixed(2)}`;

  // "top_up" and "refund" style types read as credits (money in);
  // everything else (withdrawal, payment, etc.) reads as a debit (money out).
  const isCredit = (t: Transaction) => t.amount > 0;

  const formatAmount = (t: Transaction) => {
    const sign = t.amount > 0 ? "+" : "-";
    return `${sign}$${Math.abs(t.amount).toFixed(2)}`;
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatType = (type: string) =>
    type
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const canLoadMore = !!pagination?.hasNextPage && !loadingMore;

  const handleLoadMore = () => {
    if (!pagination) return;
    void fetchTransactions(pagination.page + 1, true);
  };

  // Refresh both balance and the first page of transactions after a
  // successful top-up/withdrawal so the new entry shows up immediately.
  const refreshAfterTransaction = async () => {
    await Promise.all([fetchWallet(), fetchTransactions(1, false)]);
  };

  const openTopUpModal = () => {
    setTopUpAmount("");
    setTopUpMethod("card");
    setTopUpError("");
    setShowTopUpModal(true);
  };

  const openWithdrawModal = () => {
    setWithdrawAmount("");
    setWithdrawError("");
    setShowWithdrawModal(true);
  };

  const handleTopUp = async () => {
    setTopUpError("");

    const amount = Number(topUpAmount);

    if (!topUpAmount.trim() || Number.isNaN(amount) || amount <= 0) {
      setTopUpError("Enter a valid amount greater than 0.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setTopUpError("Authentication token not found.");
      return;
    }

    setTopUpLoading(true);

    try {
      const response = await fetch(`${API_BASE}/wallet/top-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          paymentMethod: topUpMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") || data.message || "Top up failed.",
        );
      }

      setShowTopUpModal(false);
      await refreshAfterTransaction();
    } catch (err) {
      setTopUpError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setTopUpLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setWithdrawError("");

    const amount = Number(withdrawAmount);

    if (!withdrawAmount.trim() || Number.isNaN(amount) || amount <= 0) {
      setWithdrawError("Enter a valid amount greater than 0.");
      return;
    }

    if (wallet && amount > wallet.balance) {
      setWithdrawError("Amount exceeds your available balance.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setWithdrawError("Authentication token not found.");
      return;
    }

    setWithdrawLoading(true);

    try {
      const response = await fetch(`${API_BASE}/wallet/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") || data.message || "Withdrawal failed.",
        );
      }

      setShowWithdrawModal(false);
      await refreshAfterTransaction();
    } catch (err) {
      setWithdrawError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
          Wallet & Payments
        </h1>
        <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
          Manage payment methods, view balance, and track transactions.
        </p>
      </div>

      {walletError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {walletError}
        </p>
      )}

      <div className="grid xl:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <div className="border border-[#D1FAE5] bg-gradient-to-br from-white to-[#ECFDF580] lg:rounded-2xl rounded-lg lg:p-8 p-3 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex justify-between items-start">
            <div>
              <p className="text-[#009966] tracking-widest text-sm mb-3">
                HUBNEPA BALANCE
              </p>

              <h2 className="font-playfair text-[32px] lg:text-[52px] text-[#0F172A]">
                {formattedBalance}
              </h2>

              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-[#6A7282]">
                  <Star size={14} className="text-[#F59E0B]" />
                  {walletLoading ? "—" : wallet?.rewardPoints ?? 0} reward points
                </span>

                <span className="flex items-center gap-1.5 text-sm text-[#6A7282]">
                  <Crown size={14} className="text-[#009966]" />
                  {walletLoading ? "—" : wallet?.membershipTier ?? "Free"} tier
                </span>
              </div>

              <div className="flex lg:gap-4 gap-2 mt-6">
                <button
                  onClick={openTopUpModal}
                  className="flex items-center gap-2 lg:px-5 px-3 lg:text-base text-sm min-w-max lg:py-3 py-1.5 bg-[#009966] text-white rounded-lg shadow-sm"
                >
                  <Plus size={18} />
                  Top Up Wallet
                </button>

                <button
                  onClick={openWithdrawModal}
                  className="flex items-center gap-2 lg:px-5 px-3 lg:text-base text-sm lg:py-3 py-1.5 border border-[#D1FAE5] text-[#009966] rounded-lg shadow-sm"
                >
                  <ArrowUpRight size={18} />
                  Withdraw
                </button>
              </div>
            </div>

            <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <Wallet className="text-[#009966]" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-[#E5E7EB] lg:rounded-2xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={18} />
                <h3 className="font-playfair text-xl text-[#0F172A]">
                  Saved Cards
                </h3>
              </div>

              <div className="border border-[#D1FAE5] rounded-xl p-4 flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    VISA
                  </span>

                  <span className="text-[#0F172A]">•••• 4291</span>

                  <span className="text-xs bg-[#D1FAE5] text-[#009966] px-2 py-1 rounded-full">
                    Primary
                  </span>
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3 mb-4">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  MC
                </span>

                <span className="text-[#6A7282]">•••• 8823</span>
              </div>

              <button className="w-full border border-[#E5E7EB] rounded-lg py-3 text-[#6A7282]">
                + Add New Card
              </button>
            </div>

            <VoucherSection />
          </div>
        </div>

        <div className="border border-[#E5E7EB] lg:rounded-2xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={18} />
            <h3 className="font-playfair text-xl text-[#0F172A]">
              Recent Activity
            </h3>
          </div>

          {transactionsLoading ? (
            <div className="flex items-center justify-center gap-2 text-[#6A7282] py-10">
              <Loader2 size={16} className="animate-spin" />
              Loading transactions...
            </div>
          ) : transactionsError ? (
            <div className="text-center py-10">
              <p className="text-sm text-red-500">{transactionsError}</p>
              <button
                onClick={() => fetchTransactions(1, false)}
                className="mt-3 text-sm border border-[#E5E7EB] rounded-lg px-4 py-2"
              >
                Retry
              </button>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-sm text-[#94A3B8] text-center py-10">
              No transactions yet.
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {transactions.map((t) => {
                  const credit = isCredit(t);

                  return (
                    <div
                      key={t._id}
                      className="flex justify-between items-center gap-3"
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <div
                          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                            credit
                              ? "bg-green-50 text-[#009966]"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {credit ? (
                            <ArrowDownLeft size={18} />
                          ) : (
                            <Out size={18} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[#0F172A] truncate">
                            {t.description || formatType(t.type)}
                          </p>

                          <p className="text-sm text-[#6A7282]">
                            {formatDate(t.createdAt)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`font-semibold shrink-0 ${
                          credit ? "text-[#009966]" : "text-[#0F172A]"
                        }`}
                      >
                        {formatAmount(t)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {canLoadMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="text-[#6A7282] mt-6 disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "View Full History"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 !mt-0 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                Top Up Wallet
              </h2>

              <button
                onClick={() => setShowTopUpModal(false)}
                disabled={topUpLoading}
                className="text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X size={20} />
              </button>
            </div>

            <label className="text-sm text-[#475569]">Amount</label>
            <div className="mt-1 mb-4 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg pl-8 pr-4 py-3 outline-none"
              />
            </div>

            <label className="text-sm text-[#475569]">Payment Method</label>
            <select
              value={topUpMethod}
              onChange={(e) => setTopUpMethod(e.target.value)}
              className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            {topUpError && (
              <p className="mt-3 text-sm text-red-500">{topUpError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowTopUpModal(false)}
                disabled={topUpLoading}
                className="border border-[#E5E7EB] px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleTopUp}
                disabled={topUpLoading}
                className="bg-[#009966] text-white px-5 py-2 rounded-lg disabled:opacity-60"
              >
                {topUpLoading ? "Processing..." : "Top Up"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 !mt-0 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                Withdraw Funds
              </h2>

              <button
                onClick={() => setShowWithdrawModal(false)}
                disabled={withdrawLoading}
                className="text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[#6A7282] mb-4">
              Available balance:{" "}
              <span className="font-medium text-[#0F172A]">
                {formattedBalance}
              </span>
            </p>

            <label className="text-sm text-[#475569]">Amount</label>
            <div className="mt-1 mb-2 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg pl-8 pr-4 py-3 outline-none"
              />
            </div>

            {withdrawError && (
              <p className="mt-3 text-sm text-red-500">{withdrawError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowWithdrawModal(false)}
                disabled={withdrawLoading}
                className="border border-[#E5E7EB] px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleWithdraw}
                disabled={withdrawLoading}
                className="bg-[#009966] text-white px-5 py-2 rounded-lg disabled:opacity-60"
              >
                {withdrawLoading ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}