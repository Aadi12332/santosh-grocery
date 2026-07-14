import {
  Leaf,
  Wheat,
  Milk,
  Wine,
  Plus,
  Truck,
  Loader2,
  ImageOff,
} from "lucide-react";
import CartModal from "../../layout/CustomerDashboard/CartModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../layout/RoleProvider";

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";
const PAGE_LIMIT = 12;

const categories = [
  { name: "All Products", value: "", icon: Leaf },
  { name: "Organic Produce", value: "Organic Produce", icon: Leaf },
  { name: "Artisan Bakery", value: "Bakery", icon: Wheat },
  { name: "Dairy & Cheese", value: "Dairy & Cheese", icon: Milk },
  { name: "Gourmet Pantry", value: "Gourmet Pantry", icon: Wine },
];

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  basePrice: number;
  discountPrice: number;
  unit: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  stockQuantity: number;
}

interface FeaturedProductsProps {
  searchQuery?: string;
}

export default function FeaturedProducts({
  searchQuery = "",
}: FeaturedProductsProps) {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const { setRole } = useRole();

  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const buildUrl = (pageToFetch: number) => {
    const params = new URLSearchParams();
    params.set("page", String(pageToFetch));
    params.set("limit", String(PAGE_LIMIT));

    if (activeCategory) params.set("category", activeCategory);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    return `${API_BASE}/products?${params.toString()}`;
  };

  const fetchProducts = async (pageToFetch: number, append: boolean) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const res = await fetch(buildUrl(pageToFetch), {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to load products.");
      }

      const items: Product[] = data?.data?.data || [];
      const pagination = data?.data?.pagination;

      setProducts((prev) => (append ? [...prev, ...items] : items));
      setHasMore(!!pagination?.hasNextPage);
      setPage(pageToFetch);
    } catch (err: any) {
      setError(err.message || "Something went wrong loading products.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // refetch whenever category or search changes
  useEffect(() => {
    fetchProducts(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const handleLoadMore = () => {
    fetchProducts(page + 1, true);
  };

  const handleProductClick = (productId: string) => {
    if (isLoggedIn) {
      setRole("customer");
      navigate(`/customer/dashboard/product-details?id=${productId}`);
    } else {
      navigate("/role-wise-sign-in?role=customer");
    }
  };

  const handleAddClick = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/role-wise-sign-in?role=customer");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/role-wise-sign-in?role=customer");
      return;
    }

    setAddingToCartId(productId);

    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      alert(err.message || "Something went wrong adding to cart.");
    } finally {
      setAddingToCartId(null);
    }
  };

  // client-side sort (API doesn't support sort param per given endpoints)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.discountPrice - b.discountPrice;
    if (sortBy === "price-high") return b.discountPrice - a.discountPrice;
    if (sortBy === "popular") return 0; // no popularity field available
    return 0; // "newest" — API already returns in default order
  });

  return (
    <section className="bg-[#020618] py-20 text-white">
      <div className="max-w-[1265px] mx-auto px-3 lg:px-6 grid lg:grid-cols-[260px_1fr] gap-10">
        <div className="space-y-6">
          <h3 className="text-[22px] font-medium text-[#CAD5E2] font-playfair">
            Categories
          </h3>

          <div className="space-y-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;

              return (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition ${
                    isActive
                      ? "bg-[#2A0E0E] text-orange-400"
                      : "text-[#94A3B8] hover:bg-[#0F172B]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {cat.name}
                  </div>
                  {isActive && <span>›</span>}
                </button>
              );
            })}
          </div>

          <div className="bg-[#0F172B] border border-[#1D293D] rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-orange-500">
              <Truck size={20} />
            </div>

            <h4 className="font-bold text-[20px] font-playfair">
              Free Delivery
            </h4>

            <p className="text-base text-[#90A1B9]">
              On all orders above $ 50.00
            </p>

            <button className="bg-[#FFFFFF1A] text-base font-medium px-4 py-2 rounded-lg w-full">
              Learn More
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
            <h2 className="font-playfair font-medium text-[28px]">
              Featured Products
            </h2>
            <div className="flex gap-3 items-center">
              <span className="text-sm text-[#94A3B8]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0F172B] text-sm px-2 py-2 rounded-lg outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-orange-500" />
            </div>
          )}

          {!loading && error && (
            <p className="text-red-400 text-center py-10">{error}</p>
          )}

          {!loading && !error && sortedProducts.length === 0 && (
            <p className="text-[#94A3B8] text-center py-10">
              No products found.
            </p>
          )}

          {!loading && !error && sortedProducts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const img = product.images?.[0];
                const hasDiscount = product.discountPrice < product.basePrice;
                const isAdding = addingToCartId === product._id;

                return (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-[#0F172B] border border-[#1D293D] rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <div className="relative">
                      {img ? (
                        <img
                          src={img}
                          className="w-full h-[282px] object-cover"
                        />
                      ) : (
                        <div className="w-full h-[282px] bg-[#1E293B] flex flex-col items-center justify-center gap-2 text-[#62748E]">
                          <ImageOff size={32} />
                          <span className="text-xs">No Image Available</span>
                        </div>
                      )}

                      {product.isNewArrival && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-[10px] px-3 py-1 rounded-full">
                          NEW ARRIVAL
                        </span>
                      )}

                      <button
                        onClick={(e) => handleAddClick(e, product._id)}
                        disabled={isAdding}
                        className="absolute bottom-3 right-3 w-10 h-10 border rounded-full flex items-center justify-center bg-[#1E293B] disabled:opacity-60"
                      >
                        {isAdding ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Plus size={18} />
                        )}
                      </button>
                    </div>

                    <div className="p-5 space-y-2">
                      <p className="text-sm text-[#62748E]">
                        {product.category}
                      </p>

                      <h3 className="font-medium text-[20px] font-playfair">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-lg">
                              ${product.discountPrice.toFixed(2)}
                            </p>
                            {hasDiscount && (
                              <p className="text-sm text-[#62748E] line-through">
                                ${product.basePrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <p className="text-xs text-[#62748E]">
                            {product.unit}
                          </p>
                        </div>

                        <button
                          onClick={(e) => handleAddClick(e, product._id)}
                          disabled={isAdding}
                          className="bg-[#00A63E] text-sm px-4 py-1.5 rounded-full disabled:opacity-60 flex items-center gap-1.5"
                        >
                          {isAdding ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            "Add"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <CartModal
            selectedProduct={selectedProductId || undefined}
            open={openCart}
            onClose={() => setOpenCart(false)}
          />

          {!loading && !error && hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="text-[#94A3B8] hover:text-white transition disabled:opacity-60"
              >
                {loadingMore ? "Loading..." : "Load More Products →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
