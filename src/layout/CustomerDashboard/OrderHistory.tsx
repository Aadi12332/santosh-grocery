import {
  Search,
  Filter,
  Package,
  MapPin,
  Clock,
  Truck,
  Utensils,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type DeliveryAddress = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type OrderItem = {
  itemType: string;
  product: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  _id: string;
};

type OrderParty = {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
} | null;

type Order = {
  _id: string;
  orderId: string;
  orderType: string;
  restaurant: OrderParty;
  retailer: OrderParty;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  estimatedDelivery: string | null;
  notes: string;
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

type TrackingStep = {
  status: string;
  label: string;
  description: string;
  icon: string;
  completed: boolean;
  active: boolean;
  timestamp: string | null;
  note?: string | null;
};

type TrackingData = {
  orderId: string;
  orderNumber: string;
  status: string;
  currentStep: { label: string; description: string; icon: string };
  timeline: TrackingStep[];
  isCancelled: boolean;
  estimatedDelivery: string | null;
  deliveryAddress: DeliveryAddress;
  deliveryPartner: { available: boolean; message?: string };
  total: number;
  createdAt: string;
  deliveredAt: string | null;
  cancelReason: string | null;
};

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const PAGE_LIMIT = 10;

const statusStyles: any = {
  pending: "bg-[#FFF7ED] text-[#EA580C]",
  confirmed: "bg-[#EFF6FF] text-[#2563EB]",
  preparing: "bg-[#FFF7ED] text-[#EA580C]",
  ready: "bg-[#EFF6FF] text-[#2563EB]",
  picked_up: "bg-[#EFF6FF] text-[#2563EB]",
  transit: "bg-[#EFF6FF] text-[#2563EB]",
  in_transit: "bg-[#EFF6FF] text-[#2563EB]",
  delivered: "bg-[#ECFDF5] text-[#009966]",
  cancelled: "bg-[#FEE2E2] text-red-500",
};

const ACTIVE_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
  "in_transit",
];

const formatStatusLabel = (status: string) => {
  if (status === "in_transit" || status === "transit") return "In Transit";
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const getPartnerName = (party: OrderParty) =>
  party?.fullName ||
  `${party?.firstName ?? ""} ${party?.lastName ?? ""}`.trim() ||
  "Unknown";

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const [tab, setTab] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [showTrackModal, setShowTrackModal] = useState(false);
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  const fetchOrders = async (page: number, append: boolean) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setOrdersError("Authentication token not found.");
      setOrdersLoading(false);
      return;
    }

    if (append) {
      setLoadingMore(true);
    } else {
      setOrdersLoading(true);
    }
    setOrdersError("");

    try {
      const response = await fetch(
        `${API_BASE}/orders/my?page=${page}&limit=${PAGE_LIMIT}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load orders.");
      }

      const items: Order[] = data?.data?.data ?? [];
      const pageInfo: Pagination | null = data?.data?.pagination ?? null;

      setOrders((prev) => (append ? [...prev, ...items] : items));
      setPagination(pageInfo);
    } catch (err) {
      setOrdersError(
        err instanceof Error ? err.message : "Unable to load orders.",
      );
    } finally {
      setOrdersLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    void fetchOrders(1, false);
  }, []);

  const handleLoadMore = () => {
    if (!pagination) return;
    void fetchOrders(pagination.page + 1, true);
  };

  const fetchOrderDetails = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setSelectedOrder(null);
    setDetailsError("");
    setDetailsLoading(true);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setDetailsError("Authentication token not found.");
      setDetailsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/orders/my/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load order details.");
      }

      setSelectedOrder(data?.data?.order ?? null);
    } catch (err) {
      setDetailsError(
        err instanceof Error ? err.message : "Unable to load order details.",
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const fetchTracking = async (orderId: string) => {
    setShowTrackModal(true);
    setTracking(null);
    setTrackingError("");
    setTrackingLoading(true);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setTrackingError("Authentication token not found.");
      setTrackingLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/orders/my/${orderId}/track`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load tracking info.");
      }

      setTracking(data?.data ?? null);
    } catch (err) {
      setTrackingError(
        err instanceof Error ? err.message : "Unable to load tracking info.",
      );
    } finally {
      setTrackingLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (tab !== "all" && o.orderType !== tab) return false;

      if (status === "active" && !ACTIVE_STATUSES.includes(o.status)) {
        return false;
      }
      if (status === "delivered" && o.status !== "delivered") return false;
      if (status === "cancelled" && o.status !== "cancelled") return false;

      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const partnerName = getPartnerName(
          o.restaurant || o.retailer,
        ).toLowerCase();
        const itemNames = o.items.map((i) => i.name.toLowerCase()).join(" ");

        if (!partnerName.includes(query) && !itemNames.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [orders, tab, status, search]);

  const formatTime = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
            Order History
          </h1>

          <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
            Track current orders and view past receipts.
          </p>
        </div>

        <div className="flex gap-3">
          {["all", "food", "grocery"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg border shadow-sm capitalize ${
                tab === t
                  ? "bg-[#009966] text-white border-[#009966]"
                  : "bg-white border-[#E5E7EB]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 border border-[#E5E7EB] rounded-lg lg:rounded-xl px-4 py-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
          <Search size={18} className="text-[#64748B]" />

          <input
            placeholder="Search by restaurant or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg lg:rounded-xl px-4 bg-[#009966] text-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        >
          <Filter size={18} />
          Filter
        </button>
      </div>

      {showFilter && (
        <div className="mt-4 border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-6 p-3 bg-[#fff] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
          <p className="text-sm font-semibold text-[#64748B] mb-4">
            ORDER STATUS
          </p>

          <div className="flex flex-wrap lg:gap-3 gap-1">
            {["all", "active", "delivered", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`lg:px-4 px-3 py-2 rounded-lg border text-sm capitalize transition
          ${
            status === s
              ? "bg-[#ECFDF5] text-[#009966] border-[#009966]"
              : "bg-white border-[#E5E7EB] text-[#475569]"
          }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="space-y-4">
          {ordersLoading && (
            <p className="text-[#6A7282] text-center py-6">
              Loading orders...
            </p>
          )}

          {!ordersLoading && ordersError && (
            <p className="text-red-500 text-center py-6">{ordersError}</p>
          )}

          {!ordersLoading && !ordersError && filteredOrders.length === 0 && (
            <p className="text-[#94A3B8] text-center py-6">
              No orders match your filters.
            </p>
          )}

          {!ordersLoading &&
            !ordersError &&
            filteredOrders.map((o) => {
              const partnerName = getPartnerName(o.restaurant || o.retailer);
              const itemsSummary = o.items.map((i) => i.name).join(", ");

              return (
                <div
                  key={o._id}
                  onClick={() => fetchOrderDetails(o._id)}
                  className={`flex justify-between border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-4 p-2 bg-white cursor-pointer transition
                            shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]
                            ${selectedOrderId === o._id ? "ring-2 ring-[#009966]" : ""}
                            `}
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20">
                      <div className="w-20 h-20 min-w-20 rounded-lg bg-gray-100 flex items-center justify-center">
                        {o.orderType === "food" ? (
                          <Utensils size={24} className="text-[#94A3B8]" />
                        ) : (
                          <ShoppingBag size={24} className="text-[#94A3B8]" />
                        )}
                      </div>

                      <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {o.orderType === "food" ? (
                          <Utensils size={12} className="text-[#009966]" />
                        ) : (
                          <ShoppingBag size={12} className="text-[#F97316]" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg text-[#0F172A]">
                        {partnerName}
                      </h3>

                      <p className="text-[#6A7282] text-sm mt-1">
                        {itemsSummary}
                      </p>

                      <span
                        className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${statusStyles[o.status] || "bg-[#F1F5F9] text-[#475569]"}`}
                      >
                        {formatStatusLabel(o.status)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col gap-3 justify-between">
                    <p className="text-sm text-[#6A7282]">
                      {formatTime(o.createdAt)}
                    </p>

                    <p className="font-semibold text-lg text-[#0F172A]">
                      ${o.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}

          {!ordersLoading && !ordersError && pagination?.hasNextPage && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-full text-[#6A7282] border border-[#E5E7EB] rounded-lg py-3 bg-white disabled:opacity-60"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </div>

        <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-4 p-2 bg-[#F9FAFB]">
          {!selectedOrderId ? (
            <div className="flex flex-col items-center justify-center text-center text-[#94A3B8] py-10">
              <Package size={40} />

              <p className="mt-3">Select an order to view details</p>
            </div>
          ) : detailsLoading ? (
            <div className="flex flex-col items-center justify-center text-center text-[#94A3B8] py-10">
              <p>Loading details...</p>
            </div>
          ) : detailsError ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <p className="text-red-500 text-sm">{detailsError}</p>
            </div>
          ) : selectedOrder ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between relative">
  <div>
    <h2 className="font-playfair text-2xl text-[#0F172A]">
      Order Details
    </h2>

    <p className="text-[#6A7282] mt-1">{selectedOrder.orderId}</p>
  </div>

  <div className="relative">
    <button
      onClick={() => setShowOrderMenu((prev) => !prev)}
      className="text-[#94A3B8] text-xl hover:text-[#0F172A] transition"
    >
      ⋮
    </button>

    {showOrderMenu && (
      <>
        {/* backdrop to close on outside click */}
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowOrderMenu(false)}
        />

        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 py-1">
          {selectedOrder.status !== "delivered" &&
            selectedOrder.status !== "cancelled" && (
              <button
                onClick={() => {
                  setShowOrderMenu(false);
                  fetchTracking(selectedOrder._id);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F1F5F9] text-left"
              >
                <Truck size={15} />
                Track Order
              </button>
            )}

          <button
            onClick={() => {
              setShowOrderMenu(false);
              // TODO: hook up invoice download/view when API is available
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F1F5F9] text-left"
          >
            <FileText size={15} />
            Invoice
          </button>
        </div>
      </>
    )}
  </div>
</div>

              <div className="relative">
                <div className="w-full h-48 rounded-xl bg-gray-100 flex items-center justify-center">
                  {selectedOrder.orderType === "food" ? (
                    <Utensils size={40} className="text-[#94A3B8]" />
                  ) : (
                    <ShoppingBag size={40} className="text-[#94A3B8]" />
                  )}
                </div>

                {selectedOrder.status !== "delivered" &&
                  selectedOrder.status !== "cancelled" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-[#FFFFFFE5] px-4 py-2 rounded-full shadow text-[#155DFC] text-xs">
                        <Truck size={13} />
                        {formatStatusLabel(selectedOrder.status)}
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex gap-3">
                <MapPin className="text-[#009966]" size={20} />

                <div>
                  <p className="font-semibold text-[#0F172A]">
                    Delivery Address
                  </p>

                  <p className="text-[#6A7282] text-sm">
                    {selectedOrder.deliveryAddress.street},{" "}
                    {selectedOrder.deliveryAddress.city},{" "}
                    {selectedOrder.deliveryAddress.state}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="text-[#009966]" size={20} />

                <div>
                  <p className="font-semibold text-[#0F172A]">
                    Estimated Arrival
                  </p>

                  <p className="text-[#6A7282] text-sm">
                    {formatTime(selectedOrder.estimatedDelivery)}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB]" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#6A7282]">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#6A7282]">
                  <span>Delivery Fee</span>
                  <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#6A7282]">
                  <span>Tax</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB]" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#0F172A]">
                  Total
                </span>

                <span className="text-xl font-semibold text-[#009966]">
                  ${selectedOrder.total.toFixed(2)}
                </span>
              </div>

              {/* {selectedOrder.status !== "delivered" &&
                selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() => fetchTracking(selectedOrder._id)}
                    className="border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 text-[#0F172A] bg-white shadow-sm"
                  >
                    <Truck size={16} />
                    Track Order
                  </button>
                )}

              <button className="border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 text-[#0F172A] bg-white shadow-sm">
                Invoice
              </button> */}

              <p className="text-xs text-[#6A7282]">
                Problem with order? Request Return/Refund
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {showTrackModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 !mt-0 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                {tracking ? `Order ${tracking.orderNumber}` : "Track Order"}
              </h2>

              <button
                onClick={() => setShowTrackModal(false)}
                className="text-[#94A3B8] text-xl"
              >
                ×
              </button>
            </div>

            {trackingLoading ? (
              <p className="text-[#6A7282] text-center py-10">
                Loading tracking info...
              </p>
            ) : trackingError ? (
              <p className="text-red-500 text-sm text-center py-10">
                {trackingError}
              </p>
            ) : tracking ? (
              <div className="space-y-3">
                {tracking.isCancelled ? (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-600">
                    Order cancelled
                    {tracking.cancelReason ? `: ${tracking.cancelReason}` : "."}
                  </div>
                ) : (
                  <div className="space-y-0">
                    {tracking.timeline.map((step, i) => (
                      <div key={step.status} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${
                              step.completed
                                ? "bg-[#ECFDF5] border border-[#D0FAE5]"
                                : "bg-[#F1F5F9] border border-[#E5E7EB] opacity-60"
                            }`}
                          >
                            {step.icon}
                          </div>

                          {i !== tracking.timeline.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 min-h-[24px] ${
                                step.completed ? "bg-[#D0FAE5]" : "bg-[#E5E7EB]"
                              }`}
                            />
                          )}
                        </div>

                        <div className="pb-2">
                          <p
                            className={`font-medium ${
                              step.completed || step.active
                                ? "text-[#0F172A]"
                                : "text-[#94A3B8]"
                            }`}
                          >
                            {step.label}
                          </p>

                          <p className="text-xs text-[#6A7282] mt-0.5">
                            {step.description}
                          </p>

                          {step.timestamp && (
                            <p className="text-xs text-[#94A3B8] mt-1">
                              {formatTime(step.timestamp)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-[#E5E7EB] pt-4 space-y-3">
                  <div className="flex gap-3">
                    <MapPin className="text-[#009966] shrink-0" size={18} />
                    <p className="text-sm text-[#6A7282]">
                      {tracking.deliveryAddress.street},{" "}
                      {tracking.deliveryAddress.city}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Truck className="text-[#009966] shrink-0" size={18} />
                    <p className="text-sm text-[#6A7282]">
                      {tracking.deliveryPartner.available
                        ? "Delivery partner assigned"
                        : tracking.deliveryPartner.message ||
                          "Delivery partner not assigned yet."}
                    </p>
                  </div>

                  {tracking.estimatedDelivery && (
                    <div className="flex gap-3">
                      <Clock className="text-[#009966] shrink-0" size={18} />
                      <p className="text-sm text-[#6A7282]">
                        Estimated: {formatTime(tracking.estimatedDelivery)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}