import {
  ArrowLeft,
  Share2,
  Heart,
  Info,
  Star,
  Clock,
  Plus,
  Loader2,
  ImageOff,
  Leaf,
  Check,
  X,
  MapPin,
  Phone,
  Truck,
  Link2,
  MessageCircle,
  Facebook,
  Twitter,
  Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartModal from "./CartModal";

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80";

// ---------- Types ----------
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface DeliveryTime {
  min: number;
  max: number;
}

interface Rating {
  average: number;
  count: number;
}

interface MenuItemApi {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  image: string | null;
  isAvailable: boolean;
  isVeg: boolean;
  dietaryTags: string[];
  tags: string[];
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}

interface RestaurantApi {
  _id: string;
  name: string;
  slug: string;
  description: string;
  logo: string | null;
  banner: string | null;
  cuisine: string[];
  tags: string[];
  address?: Address;
  phone?: string;
  deliveryTime: DeliveryTime;
  rating: Rating;
  reviewCount: number;
  deliveryFee: number;
  minimumOrder: number;
  freeDeliveryAbove?: number;
  isOpen: boolean;
  isExclusivePartner: boolean;
  distanceInMiles: number | null;
  menu?: MenuItemApi[];
}

interface MenuByCategory {
  [category: string]: MenuItemApi[];
}

interface AddToCartPayload {
  itemType: "menuItem";
  restaurantId: string;
  menuItemId: string;
  quantity: number;
}

// ---------- Component ----------
export default function RestaurantMenuDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("id");

  const [restaurant, setRestaurant] = useState<RestaurantApi | null>(null);
  const [menuByCategory, setMenuByCategory] = useState<MenuByCategory>({});
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart state
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItemApi | null>(null);

  // Wishlist state
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Info & Share modal state
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!restaurantId) {
      setError("No restaurant selected.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchRestaurantAndMenu(id: string) {
      setLoading(true);
      setError(null);

      try {
        const [detailsRes, menuRes] = await Promise.all([
          fetch(`${API_BASE}/restaurants/${id}`, {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          }),
          fetch(`${API_BASE}/restaurants/${id}/menu`, {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          }),
        ]);

        const detailsJson = await detailsRes.json();
        const menuJson = await menuRes.json();

        if (!detailsJson.success) {
          throw new Error(detailsJson.message || "Failed to load restaurant.");
        }
        if (!menuJson.success) {
          throw new Error(menuJson.message || "Failed to load menu.");
        }

        setRestaurant(detailsJson.data.restaurant);
        const menuData: MenuByCategory = menuJson.data.menu || {};
        setMenuByCategory(menuData);
        setActiveTab(Object.keys(menuData)[0] || "");
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Unable to load restaurant menu.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantAndMenu(restaurantId);
    return () => controller.abort();
  }, [restaurantId]);

  const handleAddToCart = async (item: MenuItemApi) => {
    if (!restaurantId) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setCartError("Please log in to add items to your cart.");
      return;
    }

    setAddingItemId(item._id);
    setCartError(null);

    const payload: AddToCartPayload = {
      itemType: "menuItem",
      restaurantId,
      menuItemId: item._id,
      quantity: 1,
    };

    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add item to cart.");
      }

      setAddedItemId(item._id);
      setTimeout(() => setAddedItemId(null), 1500);

      setSelectedProduct(item);
      setOpenCart(true);
    } catch (err: unknown) {
      setCartError(
        err instanceof Error ? err.message : "Unable to add item to cart."
      );
    } finally {
      setAddingItemId(null);
    }
  };

  const handleAddToWishlist = async () => {
    if (!restaurantId) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setCartError("Please log in to add to wishlist.");
      return;
    }

    setIsWishlisting(true);
    setCartError(null);

    try {
      const res = await fetch(`${API_BASE}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Note: Adjust itemType to "restaurant" if your backend expects that for this specific button
          itemType: "product", 
          itemId: restaurantId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add to wishlist.");
      }

      setIsWishlisted(true);
    } catch (err: unknown) {
      setCartError(
        err instanceof Error ? err.message : "Unable to add to wishlist."
      );
    } finally {
      setIsWishlisting(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const shareText = restaurant
    ? `Check out ${restaurant.name} on HubNepa!`
    : "Check out this restaurant on HubNepa!";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-[#6A7282]">
        <Loader2 size={20} className="animate-spin" />
        Loading restaurant...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-6">
        <p className="text-red-500">{error || "Restaurant not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const categories = Object.keys(menuByCategory);
  const items = menuByCategory[activeTab] || [];
  const heroImage = restaurant.banner || restaurant.logo || FALLBACK_HERO_IMAGE;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="relative h-[420px] w-full">
        <img
          src={heroImage}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,24,0.3)_0%,rgba(2,6,24,0.55)_60%,rgba(2,6,24,0.85)_100%)]" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#00000066] flex items-center justify-center text-white hover:bg-[#00000099] transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="w-10 h-10 rounded-full bg-[#00000066] flex items-center justify-center text-white hover:bg-[#00000099] transition"
            >
              <Share2 size={16} />
            </button>
            
            {/* UPDATED WISHLIST BUTTON */}
            <button 
              onClick={handleAddToWishlist}
              disabled={isWishlisting}
              className="w-10 h-10 rounded-full bg-[#00000066] flex items-center justify-center text-white hover:bg-[#00000099] transition disabled:opacity-70"
            >
              {isWishlisting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Heart 
                  size={16} 
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""} 
                />
              )}
            </button>

            <button
              onClick={() => setShowInfoModal(true)}
              className="w-10 h-10 rounded-full bg-[#00000066] flex items-center justify-center text-white hover:bg-[#00000099] transition"
            >
              <Info size={16} />
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
          {restaurant.isExclusivePartner && (
            <span className="inline-block bg-[#00A63E] text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              HubNepa Exclusive
            </span>
          )}

          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">
            {restaurant.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1 bg-[#0000004D] px-2.5 py-1 rounded-full font-medium">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              {restaurant.rating.average.toFixed(1)} ({restaurant.rating.count}{" "}
              {restaurant.rating.count === 1 ? "review" : "reviews"})
            </span>

            {restaurant.cuisine.length > 0 && (
              <>
                <span className="text-white/70">•</span>
                <span className="text-white/90">
                  {restaurant.cuisine.join(" • ")}
                </span>
              </>
            )}

            <span className="text-white/70">•</span>
            <span className="flex items-center gap-1 text-white/90">
              <Clock size={14} />
              {restaurant.deliveryTime.min}-{restaurant.deliveryTime.max} min
            </span>

            {!restaurant.isOpen && (
              <span className="bg-[#62748E] text-white text-xs font-semibold px-3 py-1 rounded-full ml-1">
                Closed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      {categories.length > 0 && (
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20">
          <div className="max-w-[1100px] mx-auto px-6 flex items-center gap-8 overflow-x-auto">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-4 text-sm font-medium whitespace-nowrap transition ${
                  activeTab === tab
                    ? "text-[#00A63E]"
                    : "text-[#6A7282] hover:text-[#0F172A]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#00A63E] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu section */}
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-playfair text-3xl font-semibold text-[#0F172A]">
            {activeTab || "Menu"}
          </h2>
          <span className="text-[#94A3B8] text-sm">{items.length} items</span>
        </div>

        {cartError && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center justify-between">
            {cartError}
            <button
              onClick={() => setCartError(null)}
              className="text-red-400 hover:text-red-600 ml-3"
            >
              ✕
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-16 text-[#94A3B8]">
            No items in this category yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((item) => {
              const isAdding = addingItemId === item._id;
              const isAdded = addedItemId === item._id;

              return (
                <div
                  key={item._id}
                  className={`border rounded-2xl p-4 flex gap-4 bg-white ${
                    item.isAvailable
                      ? "border-[#E5E7EB]"
                      : "border-[#E5E7EB] opacity-60"
                  }`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-xl shrink-0"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-xl shrink-0 bg-[#F1F5F9] flex flex-col items-center justify-center text-[#94A3B8]">
                      <ImageOff size={22} />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-playfair text-lg font-semibold text-[#0F172A] flex items-center gap-2">
                        {item.isVeg && (
                          <Leaf size={14} className="text-[#00A63E] shrink-0" />
                        )}
                        {item.name}
                      </h3>

                      <div className="text-right whitespace-nowrap">
                        {item.discountPrice != null ? (
                          <>
                            <span className="text-[#00A63E] font-semibold">
                              ${item.discountPrice.toFixed(2)}
                            </span>
                            <span className="text-[#94A3B8] text-xs line-through ml-1">
                              ${item.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#00A63E] font-semibold">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#6A7282] mt-1 flex-1">
                      {item.description}
                    </p>

                    {!item.isAvailable ? (
                      <span className="self-end mt-3 text-xs font-medium text-[#94A3B8] px-4 py-1.5">
                        Currently unavailable
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdding}
                        className={`self-end mt-3 flex items-center gap-1 text-sm font-medium px-4 py-1.5 rounded-full transition disabled:opacity-70 ${
                          isAdded
                            ? "bg-[#00A63E] text-white"
                            : "bg-[#DCFCE7] text-[#00A63E] hover:bg-[#BBF7D0]"
                        }`}
                      >
                        {isAdding ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Adding...
                          </>
                        ) : isAdded ? (
                          <>
                            <Check size={14} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            Add to Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
              <h3 className="font-playfair text-xl font-semibold text-[#0F172A]">
                About {restaurant.name}
              </h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] text-[#94A3B8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {restaurant.description && (
                <p className="text-[#4A5565] text-sm leading-relaxed">
                  {restaurant.description}
                </p>
              )}

              {restaurant.address && (
                <div className="flex gap-3">
                  <MapPin size={18} className="text-[#00A63E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      Address
                    </p>
                    <p className="text-sm text-[#6A7282]">
                      {restaurant.address.street}, {restaurant.address.city},{" "}
                      {restaurant.address.state} {restaurant.address.zipCode},{" "}
                      {restaurant.address.country}
                    </p>
                  </div>
                </div>
              )}

              {restaurant.phone && (
                <div className="flex gap-3">
                  <Phone size={18} className="text-[#00A63E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Phone</p>
                    <p className="text-sm text-[#6A7282]">{restaurant.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Truck size={18} className="text-[#00A63E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0F172A]">
                    Delivery details
                  </p>
                  <p className="text-sm text-[#6A7282]">
                    Delivery fee: ${restaurant.deliveryFee.toFixed(2)}
                  </p>
                  <p className="text-sm text-[#6A7282]">
                    Minimum order: ${restaurant.minimumOrder.toFixed(2)}
                  </p>
                  {restaurant.freeDeliveryAbove != null && (
                    <p className="text-sm text-[#6A7282]">
                      Free delivery on orders above $
                      {restaurant.freeDeliveryAbove.toFixed(2)}
                    </p>
                  )}
                  <p className="text-sm text-[#6A7282]">
                    Estimated time: {restaurant.deliveryTime.min}-
                    {restaurant.deliveryTime.max} min
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Star size={18} className="text-[#00A63E] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Rating</p>
                  <p className="text-sm text-[#6A7282]">
                    {restaurant.rating.average.toFixed(1)} average from{" "}
                    {restaurant.rating.count}{" "}
                    {restaurant.rating.count === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>

              {restaurant.cuisine.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#0F172A] mb-2">
                    Cuisine
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisine.map((c, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-[#F1F5F9] text-[#4A5565]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-sm w-full"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
              <h3 className="font-playfair text-xl font-semibold text-[#0F172A]">
                Share {restaurant.name}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] text-[#94A3B8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <span className="text-xs text-[#4A5565]">WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                  <Facebook size={18} className="text-[#1877F2]" />
                </div>
                <span className="text-xs text-[#4A5565]">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <Twitter size={18} className="text-[#0F172A]" />
                </div>
                <span className="text-xs text-[#4A5565]">X / Twitter</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#FEF9C3] flex items-center justify-center">
                  {copied ? (
                    <Check size={18} className="text-[#00A63E]" />
                  ) : (
                    <Copy size={18} className="text-[#CA8A04]" />
                  )}
                </div>
                <span className="text-xs text-[#4A5565]">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>
            </div>

            <div className="px-5 pb-5">
              <div className="flex items-center gap-2 bg-[#F1F5F9] rounded-lg px-3 py-2.5">
                <Link2 size={14} className="text-[#94A3B8] shrink-0" />
                <span className="text-xs text-[#6A7282] truncate flex-1">
                  {shareUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="text-xs font-medium text-[#00A63E] shrink-0"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartModal
        // selectedProduct={selectedProduct || undefined}
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </div>
  );
}