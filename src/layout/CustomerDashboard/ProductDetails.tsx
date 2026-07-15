import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Share2,
  Info,
  Loader2,
  AlertCircle,
  MessageCircle,
  Facebook,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartModal from "./CartModal";

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553621042-f6e147245754";

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  basePrice: number;
  discountPrice: number;
  unit: string;
  shippingClass: string;
  isFreeShipping: boolean;
  stockQuantity: number;
  lowStockAlert: number;
  isNewArrival: boolean;
  isFeatured: boolean;
  rating: { average: number; count: number };
  retailer: {
    fullName: string;
  };
}

export default function ProductDetails({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlistError, setWishlistError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([
    FALLBACK_IMG,
    FALLBACK_IMG,
    FALLBACK_IMG,
  ]);
  const [activeImg, setActiveImg] = useState(FALLBACK_IMG);
  const [qty, setQty] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareText = product
    ? `Check out ${product.name} on HubNepa!`
    : "Check out this product on HubNepa!";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const shareMore = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      await handleCopyLink();
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login to add items to your cart.");
      return;
    }

    setCartLoading(true);
    setCartError(null);

    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemType: "product",
          itemId: product._id,
          quantity: qty,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add to cart.");
      }

      setOpenCart(true);
    } catch (err: any) {
      setCartError(err.message || "Something went wrong.");
      alert(err.message || "Something went wrong.");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product selected.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/products/${productId}`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data?.message || "Failed to load product.");
        }

        const fetchedProduct: Product = data?.data?.product;
        setProduct(fetchedProduct);

        const productImages = fetchedProduct?.images?.length
          ? fetchedProduct.images
          : [FALLBACK_IMG, FALLBACK_IMG, FALLBACK_IMG];

        setImages(productImages);
        setActiveImg(productImages[0]);
        setQty(1);
      } catch (err: any) {
        setError(err.message || "Something went wrong loading the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToWishlist = async () => {
    if (!product) return;

    setWishlistError(null);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setWishlistError("Please login to add items to your wishlist.");

      setTimeout(() => {
        setWishlistError(null);
      }, 3000);

      return;
    }

    setWishlistLoading(true);

    try {
      const res = await fetch(`${API_BASE}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemType: "product",
          itemId: product._id,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to add to wishlist.");
      }

      setIsWishlisted(true);
      setWishlistError(null);
    } catch (err: any) {
      setWishlistError(err.message || "Something went wrong.");

      setTimeout(() => {
        setWishlistError(null);
      }, 3000);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={28} className="animate-spin text-[#009966]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-red-500">{error || "Product not found."}</p>
        <button
          onClick={() => navigate("/customer/dashboard")}
          className="mt-2 text-[#009966] font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const hasDiscount = product.discountPrice < product.basePrice;
  const total = (product.discountPrice * qty).toFixed(2);
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="">
      <button
        onClick={() => navigate("/customer/dashboard")}
        className="mb-3 text-[#6A7282]"
      >
        ← Back to Dashboard
      </button>
      {wishlistError && (
        <div className="flex items-center gap-2 w-full rounded-lg border-red-500 bg-red-200 p-3">
          <AlertCircle size={16} className="text-red-500" />
          <p className="text-sm text-red-500">{wishlistError}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 pt-3">
        <div>
          <div className="relative">
            <img
              src={activeImg}
              className="w-full aspect-square rounded-2xl object-cover"
            />

            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#009966] text-white text-xs px-3 py-1 rounded-full">
                New Arrival
              </span>
            )}

            <button
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow disabled:opacity-60"
            >
              <Heart
                size={18}
                className={isWishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`aspect-square rounded-lg object-cover cursor-pointer border ${
                  activeImg === img ? "border-[#009966]" : "border-[#E5E7EB]"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-6 text-sm mb-4">
            <div className="flex items-center gap-1 text-[#F59E0B]">
              <Star size={16} fill="#F59E0B" />
              {product.rating?.average || 0}
            </div>

            <span className="text-[#6A7282] list-disc list-item ml-0">
              {product.rating?.count || 0} Reviews
            </span>

            <span
              className={
                isOutOfStock
                  ? "text-red-500 list-disc list-item ml-0"
                  : "text-[#009966] list-disc list-item ml-0"
              }
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          <h1 className="lg:text-[40px] text-[32px] font-playfair mb-6">
            {product.name}
          </h1>

          <p className="lg:text-[32px] text-xl text-[#101828] mb-4">
            ${product.discountPrice.toFixed(2)}
            {hasDiscount && (
              <span className="text-[#99A1AF] line-through text-lg ml-3">
                ${product.basePrice.toFixed(2)}
              </span>
            )}
          </p>

          <p className="text-[#6A7282] lg:text-[20px] text-base leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-16">
            <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg lg:rounded-xl xl:p-5 p-2 flex gap-3 sm:flex-row flex-col">
              <ShoppingBag className="text-[#009966] min-w-4" />

              <div>
                <p className="font-medium">Pro Tools</p>
                <p className="text-sm text-[#6A7282]">
                  Includes bamboo mat, sashimi knife, and more
                </p>
              </div>
            </div>

            <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg lg:rounded-xl xl:p-5 p-2 flex gap-3 sm:flex-row flex-col">
              <Truck className="text-[#2563EB] min-w-4" />

              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-[#6A7282]">
                  Arrives in premium insulated packaging
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6 sm:flex-row flex-col">
            <div className="flex items-center justify-center border border-[#E5E7EB] rounded-lg">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-5"
              >
                <Minus size={16} />
              </button>

              <span className="text-center w-[50px]">{qty}</span>

              <button onClick={() => setQty(qty + 1)} className="px-4 py-5">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartLoading || isOutOfStock}
              className="flex-1 bg-[#009966] text-white rounded-lg px-3 flex items-center justify-center gap-2 py-4 shadow-lg disabled:opacity-60"
            >
              <ShoppingBag size={18} />
              {cartLoading
                ? "Adding..."
                : isOutOfStock
                  ? "Out of Stock"
                  : `Add to Cart — $${total}`}
            </button>

            <CartModal
              setActiveTab={setActiveTab}
              selectedProduct={product._id}
              open={openCart}
              onClose={() => setOpenCart(false)}
            />
          </div>

          <div className="flex gap-6 text-[#6A7282]">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2"
            >
              <Share2 size={18} />
              Share Product
            </button>

            <button
              onClick={() => setShowQuestionModal(true)}
              className="flex items-center gap-2"
            >
              <Info size={18} />
              Ask a Question
            </button>
          </div>
        </div>
      </div>
      {showQuestionModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowQuestionModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-lg w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1E293B] p-5">
              <div>
                <h3 className="font-playfair text-2xl text-white">
                  Ask a Question
                </h3>

                <p className="text-sm text-[#94A3B8] mt-1">
                  Ask anything about this product.
                </p>
              </div>

              <button
                onClick={() => setShowQuestionModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#1E293B] flex items-center justify-center text-[#94A3B8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium text-white mb-3">
                Frequently Asked
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  "Is this product fresh?",
                  "What is the delivery time?",
                  "Is cash on delivery available?",
                  "Do you offer bulk discounts?",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuestion(item)}
                    className="px-4 py-2 rounded-full border border-[#1E293B] text-sm text-[#CBD5E1] hover:bg-[#1E293B]"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label className="text-sm font-medium text-white">
                Your Question
              </label>

              <textarea
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question..."
                className="mt-2 w-full bg-[#020618] border border-[#1E293B] rounded-xl p-4 text-white placeholder:text-[#64748B] resize-none outline-none focus:border-[#009966]"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="px-5 py-2 border border-[#1E293B] text-[#CBD5E1] rounded-lg hover:bg-[#1E293B]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    alert("Question submitted successfully!");
                    setQuestion("");
                    setShowQuestionModal(false);
                  }}
                  disabled={!question.trim()}
                  className="px-6 py-2 bg-[#009966] hover:bg-[#00b377] text-white rounded-lg disabled:opacity-50"
                >
                  Submit Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-sm w-full"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#1E293B]">
              <h3 className="font-playfair text-xl font-semibold text-white">
                Share {product?.name}
              </h3>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1E293B] text-[#94A3B8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${shareText} ${shareUrl}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1E293B] hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <span className="text-xs text-[#CBD5E1]">WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1E293B] hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                  <Facebook size={18} className="text-[#1877F2]" />
                </div>
                <span className="text-xs text-[#CBD5E1]">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText,
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1E293B] hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center">
                  <Twitter size={18} className="text-white" />
                </div>
                <span className="text-xs text-[#CBD5E1]">X / Twitter</span>
              </a>

              <button
                onClick={shareMore}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1E293B] hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center">
                  <Share2 size={18} className="text-[#CBD5E1]" />
                </div>
                <span className="text-xs text-[#CBD5E1]">More</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
