import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSearchStore } from "../stores/useSearchStore";
import { useCartStore } from "../stores/useCartStore";

const placeholderReviews = [
  {
    name: "Ananya",
    rating: 5,
    date: "2 days ago",
    text: "The product quality is excellent and the delivery was super fast. Highly recommend!",
  },
  {
    name: "Rohan",
    rating: 4,
    date: "1 week ago",
    text: "Looks great and feels durable. The packaging was clean and premium.",
  },
  {
    name: "Sima",
    rating: 4.5,
    date: "3 weeks ago",
    text: "Love the design and the product matches the description. Will buy again.",
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const { searchProductsById, singleProduct, isSearching } = useSearchStore();
  const { addToCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (id) searchProductsById(id);
  }, [id, searchProductsById]);

  useEffect(() => {
    setSelectedImage(0);
  }, [singleProduct]);

  const imageUrls = useMemo(
    () => singleProduct?.images?.map((img) => img.url) || [],
    [singleProduct],
  );

  const activeImage = imageUrls[selectedImage];

  const discount = singleProduct?.discount_percentage || 0;
  const price = singleProduct?.price ?? 0;
  const discountedPrice = useMemo(
    () => (discount > 0 ? Math.round(price * (1 - discount / 100)) : price),
    [discount, price],
  );

  const handleAddToCart = () => {
    if (!singleProduct || singleProduct.stock <= 0) return;
    addToCart(singleProduct, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const reviews = useMemo(
    () =>
      singleProduct?.reviews?.length
        ? singleProduct.reviews
        : placeholderReviews,
    [singleProduct],
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
        {isSearching ? (
          <div className="py-32 text-center text-sm tracking-wide text-neutral-500">
            Loading product…
          </div>
        ) : singleProduct ? (
          <>
            {/* ---------- Top section: gallery + info ---------- */}
            <section className="grid gap-14 lg:grid-cols-[1.15fr_1px_0.85fr]">
              {/* Gallery */}
              <div>
                <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={activeImage}
                    alt={singleProduct.productName}
                    loading="lazy"
                    className="h-[420px] w-full object-cover sm:h-[480px]"
                  />
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() =>
                          setSelectedImage(
                            (prev) =>
                              (prev - 1 + imageUrls.length) % imageUrls.length,
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-neutral-900 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() =>
                          setSelectedImage(
                            (prev) => (prev + 1) % imageUrls.length,
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-neutral-900 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {imageUrls.length > 1 && (
                  <div className="mt-4 flex gap-2.5">
                    {imageUrls.map((url, index) => (
                      <button
                        key={url + index}
                        type="button"
                        aria-label={`View image ${index + 1}`}
                        onClick={() => setSelectedImage(index)}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                          selectedImage === index
                            ? "border-neutral-900"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`${singleProduct.productName} thumbnail ${index + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider (desktop only) */}
              <div className="hidden bg-neutral-200 lg:block" />

              {/* Info panel */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                  <span>{singleProduct.category}</span>
                  <span className="text-neutral-300">/</span>
                  <span
                    className={`flex items-center gap-1.5 ${
                      singleProduct.stock > 0
                        ? "text-emerald-700"
                        : "text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        singleProduct.stock > 0
                          ? "bg-emerald-600"
                          : "bg-red-600"
                      }`}
                    />
                    {singleProduct.stock > 0 ? "In stock" : "Out of stock"}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  {singleProduct.productName}
                </h1>

                <p className="mt-4 text-[15px] leading-7 text-neutral-600">
                  {singleProduct.shortDescription}
                </p>

                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-neutral-900">
                    ₹{discountedPrice.toLocaleString("en-IN")}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-base text-neutral-400 line-through">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm font-medium text-emerald-700">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-5 border-y border-neutral-200 py-3 text-sm text-neutral-600">
                  <span>
                    <span className="font-semibold text-neutral-900">
                      {singleProduct.ratings?.toFixed(1) || "0.0"}
                    </span>{" "}
                    rating
                  </span>
                  <span className="h-3.5 w-px bg-neutral-200" />
                  <span>{singleProduct.numOfReviews || 0} reviews</span>
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-neutral-300">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(singleProduct.stock || 99, q + 1),
                        )
                      }
                      className="px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={singleProduct.stock <= 0}
                    className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
                  >
                    {singleProduct.stock <= 0
                      ? "Out of stock"
                      : justAdded
                        ? "Added ✓"
                        : "Add to Cart"}
                  </button>
                  <button className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900">
                    Buy Now
                  </button>
                </div>

                <div className="mt-9 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      Product details
                    </p>
                    <p className="mt-2 text-[15px] leading-7 text-neutral-600">
                      {singleProduct.description ||
                        singleProduct.shortDescription ||
                        "No extra details provided."}
                    </p>
                  </div>

                  {singleProduct.tags?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Tags
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {singleProduct.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ---------- Reviews ---------- */}
            <section className="mt-20 border-t border-neutral-200 pt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    Customer reviews
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
                    What buyers are saying
                  </h2>
                </div>
                <span className="text-sm text-neutral-500">
                  {singleProduct.ratings?.toFixed(1) || "0.0"} / 5 average
                </span>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {reviews.map((review) => (
                  <blockquote
                    key={review.name}
                    className="border-l-2 border-neutral-900 pl-5"
                  >
                    <p className="text-[15px] leading-7 text-neutral-700">
                      “{review.text}”
                    </p>
                    <footer className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-900">
                        {review.name}
                      </span>
                      <span>
                        {review.rating} ★ · {review.date}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="py-32 text-center text-sm text-neutral-500">
            Product not found.
          </div>
        )}
      </main>
    </>
  );
};

export default ProductPage;
