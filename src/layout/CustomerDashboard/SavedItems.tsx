import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Heart,
  ShoppingBag,
  Loader2,
  PackageX,
} from "lucide-react";
import CartModal from "./CartModal";

const BASE_URL = "https://mr-santosh-grocery-backend.onrender.com/api/v1";

interface WishlistItem {
  _id: string;
  itemType: string;
  addedAt: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    images: string[];
    stockStatus: string;
    rating: {
      average: number;
      count: number;
    };
    price?: string;
    oldPrice?: string;
    sale?: boolean;
  } | null;
  restaurant: any;
}

export default function SavedItems() {
  const [openCart, setOpenCart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  const getToken = () =>
    (typeof window !== "undefined" && localStorage.getItem("authToken")) || "";

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  // ---------- GET wishlist ----------
  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/wishlist`, {
        method: "GET",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to fetch saved items");
      }

      setItems(data?.data?.wishlist?.items || []);
    } catch (err: any) {
      setError(
        err.message || "Something went wrong while fetching saved items",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ---------- DELETE single item ----------
  const removeItem = async (wishlistItemId: string) => {
    setRemovingId(wishlistItemId);
    try {
      const res = await fetch(`${BASE_URL}/wishlist/${wishlistItemId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to remove item");
      }

      setItems((prev) => prev.filter((item) => item._id !== wishlistItemId));
    } catch (err: any) {
      setError(err.message || "Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  // ---------- DELETE clear all ----------
  const clearAll = async () => {
    setClearing(true);
    try {
      const res = await fetch(`${BASE_URL}/wishlist/clear`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to clear wishlist");
      }

      setItems([]);
      setShowClearConfirm(false);
    } catch (err: any) {
      setError(err.message || "Failed to clear wishlist");
    } finally {
      setClearing(false);
    }
  };

  // ---------- POST add to cart ----------
  const addToCart = async (productId: string) => {
    const token = getToken();
    if (!token) {
      setError("Please login to add items to your cart.");
      return;
    }

    setAddingToCartId(productId);
    try {
      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          itemType: "product",
          itemId: productId,
          quantity: 1,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add to cart.");
      }

      setSelectedProductId(productId);
      setOpenCart(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong adding to cart.");
    } finally {
      setAddingToCartId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
            Saved Items
          </h1>

          <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
            Keep track of products you love.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {items.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={clearing}
              className="flex items-center gap-2 border border-red-200 text-red-600 rounded-lg w-fit lg:rounded-xl px-4 py-2 bg-white shadow-sm hover:bg-red-50 disabled:opacity-60"
            >
              {clearing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              Clear All
            </button>
          )}

          <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg w-fit lg:rounded-xl px-4 py-2 bg-white shadow-sm">
            <ShoppingBag size={18} />
            Continue Shopping
          </button>
        </div>
      </div>

      {/* error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* clear all confirm popover/banner */}
      {showClearConfirm && (
        <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-[#0F172A]">
            Are you sure you want to remove all saved items? This cannot be
            undone.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 text-sm rounded-lg border border-[#E5E7EB] bg-white"
            >
              Cancel
            </button>
            <button
              onClick={clearAll}
              disabled={clearing}
              className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white disabled:opacity-60"
            >
              {clearing ? "Clearing..." : "Yes, Clear All"}
            </button>
          </div>
        </div>
      )}

      {/* loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[#009966]" />
        </div>
      )}

      {/* empty state */}
      {!loading && items.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <PackageX size={40} className="text-[#99A1AF]" />
          <h3 className="text-lg font-playfair text-[#0F172A]">
            No saved items yet
          </h3>
          <p className="text-[#6A7282] text-sm">
            Items you save will show up here.
          </p>
        </div>
      )}

      {/* items grid */}
      {!loading && items.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const product = item.product;

            if (!product) return null;

            const img = product.images?.[0];
            const averageRating = product.rating?.average ?? 0;
            const ratingCount = product.rating?.count ?? 0;
            const price = product.price || "$0.00";
            const oldPrice = product.oldPrice;
            const isLowStock = product.stockStatus === "Low Stock";
            const stockLabel =
              product.stockStatus === "Active"
                ? "In Stock"
                : product.stockStatus || "In Stock";

            const isRemoving = removingId === item._id;
            const isAddingToCart = addingToCartId === product._id;

            return (
              <div
                key={item._id}
                className="border border-[#E5E7EB] rounded-lg lg:rounded-xl bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  {img ? (
                    <img src={img} className="w-full h-52 object-cover" />
                  ) : (
                    <div className="w-full h-52 bg-[#F1F5F9] flex items-center text-xs justify-center text-[#99A1AF]">
                      No image available
                    </div>
                  )}

                  {product.sale && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}

                  <button
                    onClick={() => removeItem(item._id)}
                    disabled={isRemoving}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow disabled:opacity-60"
                  >
                    {isRemoving ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                <div className="lg:p-5 p-2 flex flex-col gap-3 flex-1">
                  <h3 className="font-playfair text-lg text-[#0F172A]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="text-[#009966] text-xl font-bold">
                      {price}
                    </span>

                    {oldPrice && (
                      <span className="text-[#99A1AF] line-through">
                        {oldPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`px-3 py-1 font-semibold text-sm rounded-full ${
                        isLowStock
                          ? "bg-[#FFF7ED] text-[#F54900]"
                          : "bg-[#ECFDF5] text-[#009966]"
                      }`}
                    >
                      {stockLabel}
                    </span>

                    <span className="flex items-center gap-1 text-[#F0B100]">
                      <Heart size={14} className="fill-[#F0B100]" />
                      <span>
                        {averageRating} ({ratingCount})
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product._id)}
                    disabled={isAddingToCart}
                    className="mt-auto flex items-center justify-center gap-2 bg-[#009966] text-white py-3 rounded-lg shadow-sm disabled:opacity-60"
                  >
                    {isAddingToCart ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          <CartModal
            selectedProduct={selectedProductId || undefined}
            open={openCart}
            onClose={() => setOpenCart(false)}
          />
        </div>
      )}
    </div>
  );
}