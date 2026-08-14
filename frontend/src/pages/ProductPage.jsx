import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSearchStore } from "../stores/useSearchStore";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/640x480";

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
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) searchProductsById(id);
  }, [id, searchProductsById]);

  useEffect(() => {
    setSelectedImage(0);
  }, [singleProduct]);

  const imageUrls = useMemo(
    () => singleProduct?.images?.map((img) => img.url) || [],
    [singleProduct]
  );

  const activeImage = imageUrls[selectedImage] || PLACEHOLDER_IMAGE;

  const discount = singleProduct?.discount_percentage || 0;
  const price = singleProduct?.price ?? 0;
  const discountedPrice = useMemo(
    () => (discount > 0 ? Math.round(price * (1 - discount / 100)) : price),
    [discount, price]
  );

  const relatedProducts = useMemo(
    () =>
      singleProduct?.tags?.slice(0, 4).map((tag, index) => ({
        id: `${tag}-${index}`,
        name: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Choice`,
        image: imageUrls[(index + 1) % (imageUrls.length || 1)] || PLACEHOLDER_IMAGE,
        price: Math.max(price - (index + 1) * 250, 299),
      })) || [],
    [imageUrls, price, singleProduct]
  );

  const reviews = useMemo(
    () => (singleProduct?.reviews?.length ? singleProduct.reviews : placeholderReviews),
    [singleProduct]
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-base-100 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {isSearching ? (
          <div className="text-center text-lg text-slate-600">Loading product...</div>
        ) : singleProduct ? (
          <>
            <section className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
              <div className="rounded-4xl border border-slate-200/70 bg-white p-6 shadow-xl sm:p-8">
                <div className="relative overflow-hidden rounded-4xl bg-slate-950">
                  <img
                    src={activeImage}
                    alt={singleProduct.productName}
                    loading="lazy"
                    className="h-96 w-full object-cover"
                  />
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedImage((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-xl font-bold text-slate-900 shadow-lg transition hover:bg-white"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedImage((prev) => (prev + 1) % imageUrls.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-xl font-bold text-slate-900 shadow-lg transition hover:bg-white"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {imageUrls.length > 1 && (
                  <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                    {imageUrls.map((url, index) => (
                      <button
                        key={url + index}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 overflow-hidden rounded-3xl border p-1 transition-all ${
                          selectedImage === index ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`${singleProduct.productName} thumbnail ${index + 1}`}
                          loading="lazy"
                          className="h-20 w-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-4xl border border-slate-200/70 bg-white p-8 shadow-xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {singleProduct.category}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                    singleProduct.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}>
                    {singleProduct.stock > 0 ? "In stock" : "Out of stock"}
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
                  {singleProduct.productName}
                </h1>

                <p className="mt-4 text-base leading-7 text-slate-600">{singleProduct.shortDescription}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-sm">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Price</p>
                    <p className="mt-2 text-3xl font-bold">₹{discountedPrice.toLocaleString("en-IN")}</p>
                  </div>
                  {discount > 0 && (
                    <div className="rounded-3xl bg-cyan-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {discount}% off
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Rating</span>
                    <span>{singleProduct.ratings?.toFixed(1) || "0.0"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Reviews</span>
                    <span>{singleProduct.numOfReviews || 0}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Add to Cart
                  </button>
                  <button className="rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                    Buy Now
                  </button>
                </div>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Product Details</p>
                    <p className="mt-2 leading-7">{singleProduct.description || singleProduct.shortDescription || "No extra details provided."}</p>
                  </div>

                  {singleProduct.tags?.length > 0 && (
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Tags</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {singleProduct.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-10 space-y-8">
              <div className="rounded-4xl border border-slate-200/70 bg-white p-8 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Customer Reviews</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">Reviews from other buyers</h2>
                  </div>
                  <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    {singleProduct.ratings?.toFixed(1) || "0.0"} / 5
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {reviews.map((review) => (
                    <div key={review.name} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-base font-semibold text-slate-900">{review.name}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                          {review.rating} ★
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{review.text}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-4xl border border-slate-200/70 bg-white p-8 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Related Products</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">You may also like</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {relatedProducts.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-40 w-full rounded-3xl object-cover"
                      />
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">{singleProduct.category}</p>
                        <p className="text-base font-bold text-slate-900">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="text-center text-slate-500">Product not found.</div>
        )}
      </main>
    </>
  );
};

export default ProductPage;
